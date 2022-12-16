import { Request, Response } from 'express';
import { compare, hash } from 'bcrypt';
import { User, Freelancer } from '../models';
import { loginValidation, signupUserValidation, freelancerValidate } from '../validation';
import { generateToken, serverErrs } from '../helpers';
import { UserInstance } from '../interfaces';

const login = async (req: Request, res: Response) => {
  let id;
  const { email, password } = req.body;
  await loginValidation.validate({ email, password });

  const user = await User.findOne({ where: { email } });
  if (!user) throw serverErrs.BAD_REQUEST('Wrong Email Or Password');
  const result = await compare(password, user.password);
  if (!result) throw serverErrs.BAD_REQUEST('Wrong Email Or Password');

  const { name, role } = user;
  id = user.id;
  if (user.role === 'freelancer') {
    const freelancer = await Freelancer.findOne({ where: { userId: user.id } });
    if (freelancer) id = freelancer?.id;
  }
  const token = await generateToken({ userID: id, role, name });
  res.cookie('token', token);
  return { status: 200, msg: 'logged in successfully', data: { userID: id, role, name } };
};

const signupUser = async (req: Request, res: Response) => {
  const {
    role, name, email, password,
  } = req.body;
  await signupUserValidation.validate({
    role, name, email, password,
  });
  const client = await User.findOne({
    where: {
      email,
    },
  });
  if (client) throw serverErrs.BAD_REQUEST('email is already used');
  const hashedPassword = await hash(password, 12);
  const user = await User.create(
    {
      role, name, email, password: hashedPassword,
    },
    {
      returning: true,
    },
  );
  const userData = {
    userID: user.id, role: user.role, name: user.name,
  };
  const { id } = user;
  if (role === 'client') {
    const token = await generateToken({ name, role, userID: id });
    res.cookie('token', token);
  }
  return { status: 201, data: userData, msg: 'signed up successfully ' };
};

const freelancerSignUp = async (req: Request, res: Response) => {
  const {
    title, major, portfolio, brief, image, userId,
  } = req.body;
  await freelancerValidate.validate(req.body);

  const user: UserInstance | null = await User.findOne({ where: { id: userId } });
  if (!user) throw serverErrs.BAD_REQUEST('Somthing went wrong');
  const { name, role } = user;

  const freelancer = await Freelancer.create(
    {
      image,
      title,
      major,
      brief,
      userId,
      portfolio,
    },
    {
      returning: true,
    },
  );
  const token = await generateToken({ userID: freelancer.id, role, name });

  res.cookie('token', token);
  return { status: 201, data: freelancer, msg: 'successful sign up' };
};
const logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  return { status: 200, msg: 'Logged Out' };
};
export {
  login, freelancerSignUp, signupUser, logout,
};
