import { z } from 'zod';
import { PASSWORD_REGEX } from '../../../constants';
import {
  EMAIL_ALREADY_EXISTS,
  PASSWORD_FAIL,
} from '../../../constants/message';
import db from '../../../db';
import { User } from '../../models';

export const userSchema = z.object({
  email: z
    .string()
    .email()
    .refine(
      async email => {
        const current = await db.getRepository(User).findOneBy({ email });
        return !current;
      },
      { message: EMAIL_ALREADY_EXISTS }
    ),
  password: z.string().regex(new RegExp(PASSWORD_REGEX), PASSWORD_FAIL),
  avatar: z.string().url().optional(),
});
