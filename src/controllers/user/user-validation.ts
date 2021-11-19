import { User } from '@schemas/user';
import * as Joi from 'joi';

export const createUserValidation = Joi.object<User>({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  fullName: Joi.string().required(),
  description: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.string().optional(),
  created: Joi.date(),
  isActive: Joi.bool(),
});

export const updateUserValidation = Joi.object<User>({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  fullName: Joi.string().required(),
  description: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.string().optional(),
  created: Joi.date(),
  isActive: Joi.bool(),
});
