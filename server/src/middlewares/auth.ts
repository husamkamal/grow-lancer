import { Strategy as JwtStrategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import passport, { PassportStatic } from 'passport';
import {
  Request, RequestHandler,
} from 'express';
import { serverErrs } from '../helpers';

const passportAuthenticate: RequestHandler = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, jwt_payload) => {
    if (jwt_payload) {
      res.locals.user = jwt_payload;
      return next();
    }
    next(serverErrs.UNAUTHORIZED('unauthorized'));
  })(req, res);
};

const checkUserAuth = (role: string): RequestHandler => (req: Request, res, next) => {
  const isUSerAuth = role === res.locals.user?.role;
  if (isUSerAuth) {
    next();
  } else {
    next(serverErrs.UNAUTHORIZED('unauthorized'));
  }
};

const passportAuth = (passportParameter: PassportStatic) => {
  const cookieExtractor = (req: Request) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies.token;
    }
    return token;
  };

  const options: StrategyOptions = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: cookieExtractor,
  };
  passportParameter.use(
    'jwt',
    new JwtStrategy(options, (payload, done: VerifiedCallback) => {
      done(null, payload);
    }),
  );
};
export { checkUserAuth, passportAuthenticate, passportAuth };
