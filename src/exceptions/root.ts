// message, statusCode, error codes, error

import { StatusCodes } from "http-status-codes";

export enum ErrorCode {
  NOT_FOUND = StatusCodes.NOT_FOUND,
  USER_ALREADY_EXISTS = StatusCodes.CONFLICT,
  INCORRECT_PASSWORD = StatusCodes.BAD_REQUEST,
  UNPROCESSABLE_ENTITY = StatusCodes.UNPROCESSABLE_ENTITY,
  INTERNAL_EXCEPTION = StatusCodes.INTERNAL_SERVER_ERROR,
  UNAUTHORIZED = StatusCodes.UNAUTHORIZED,
  CONFLICT = StatusCodes.CONFLICT,
}

export class HttpException extends Error {
  message: string;
  errorCode: any;
  errors: ErrorCode;

  constructor(message: string, errorCode: ErrorCode, error: any) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.errors = error;
  }
}
