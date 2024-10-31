import { Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";
import { generateToken, createHash, sendEmailNotification } from "../utils";
import { SignupSchemaValidator } from "../schema/users";
import crypto from "crypto";
import { UnauthorizedException } from "../exceptions/unauthorized";

const origin = "http://localhost:3000";

export const signUp = async (req: Request, res: Response) => {
  SignupSchemaValidator.parse(req.body);
  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user)
    throw new BadRequestException(
      "User already exist",
      ErrorCode.USER_ALREADY_EXISTS,
      null
    );

  const verificationToken = crypto.randomBytes(40).toString("hex");

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
      verificationToken,
    },
  });

  const { token, options } = generateToken(user.id);
  res.cookie("token", token, options);

  await sendEmailNotification({
    name: user.name,
    emailTo: user.email,
    verificationToken,
    origin,
    type: "verification",
  });

  res
    .status(200)
    .json({ message: "Please check your email to verify account!" });
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({
    where: { email },
  });

  if (!user)
    throw new NotFoundException("User does not exist", ErrorCode.NOT_FOUND);

  if (!compareSync(password, user.password))
    throw new BadRequestException(
      "Password is incorrect",
      ErrorCode.INCORRECT_PASSWORD,
      null
    );

  if (!user.isVerified) {
    throw new UnauthorizedException(
      "Please verify your email",
      ErrorCode.UNAUTHORIZED
    );
  }

  const { token, options } = generateToken(user.id);

  res.cookie("token", token, options);
  res.status(200).json({ user });
};

export const validateUserEmail = async (req: Request, res: Response) => {
  const { verificationToken, email } = req.body;

  let user = await prismaClient.user.findFirstOrThrow({
    where: { email },
  });

  if (user.verificationToken !== verificationToken)
    throw new UnauthorizedException(
      "Verification Failed",
      ErrorCode.UNAUTHORIZED
    );

  await prismaClient.user.update({
    where: { email },
    data: {
      isVerified: true,
      verified: new Date(),
      verificationToken: "",
    },
  });

  res.status(200).json({
    message: "Your account is now active, you can go back to your dashboard!",
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await prismaClient.user.findFirstOrThrow({
    where: { email },
  });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");

    await sendEmailNotification({
      name: user.name,
      emailTo: user.email,
      verificationToken: passwordToken,
      origin,
      type: "resetPassword",
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    await prismaClient.user.update({
      where: { email },
      data: {
        passwordToken: createHash(passwordToken),
        passwordTokenExpirationDate,
      },
    });
  }

  res.status(200).json({ message: "Reset Password link sent!" });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, email, password } = req.body;

  if (!token || !email || !password) {
    throw new BadRequestException(
      "Please provide all values",
      ErrorCode.UNPROCESSABLE_ENTITY,
      null
    );
  }

  let user = await prismaClient.user.findFirstOrThrow({
    where: { email },
  });

  if (user) {
    const currentDate = new Date();

    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate &&
      user?.passwordTokenExpirationDate > currentDate
    ) {
      await prismaClient.user.update({
        where: { email },
        data: {
          passwordToken: null,
          passwordTokenExpirationDate: null,
          password: hashSync(password, 10),
        },
      });
    }
  }

  res.status(200).json("reset password, please log in back again");
};

export const getUser = async (req: Request, res: Response) => {
  res.status(200).json(req.user); // passed from MIDDLEWARE
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json({ msg: "user logged out!" });
};
