import { StatusCodes } from 'http-status-codes';

class CustomError extends Error {
  status: number;

  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

const serverErrs = {
  BAD_REQUEST: (msg: string) => new CustomError(StatusCodes.BAD_REQUEST, msg),
  UNAUTHORIZED: (msg: string) => new CustomError(StatusCodes.UNAUTHORIZED, msg),
  FORBIDDEN: (msg: string) => new CustomError(StatusCodes.FORBIDDEN, msg),
};

export { CustomError, serverErrs };
