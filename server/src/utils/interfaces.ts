export interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  maxAge: number;
}

export interface TokenResponse {
  token: string;
  options: CookieOptions;
}

export interface SendEmailInterface {
  emailTo: string;
  subject: string;
  html: string;
}

export interface SendVerificationEmailInterface {
  name: string;
  emailTo: string;
  verificationToken: string;
  origin: string;
  type: "verification" | "resetPassword";
}
