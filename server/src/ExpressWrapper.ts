import {
  RequestHandler,
} from 'express';
import { ValidationError } from 'yup';
import { CustomError } from './helpers';
import { ControllerFunction } from './interfaces';

const ExpressWrapper = (fn: ControllerFunction): RequestHandler => async (
  req,
  res,
  next,
) => {
  try {
    const { status, data = null, msg = null } = await fn(req, res, next);
    res.status(status).json({ msg, data });
  } catch (error: unknown) { // change the type of error when installing yup
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.errors });
    } else if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });
    } else {
      console.log(error, 'serverrr error');
      res.status(500).json({ message: 'Server Error' });
    }
  }
};
export default ExpressWrapper;
