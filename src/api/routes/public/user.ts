import { Router } from 'express';
import { Endpoint } from '../../../constants/endpoint';
import {
  login,
  register,
  removeUser,
  updateUser,
} from '../../controllers/user';

const router = Router();

router.post(Endpoint.REGISTER, register);
router.post(Endpoint.LOGIN, login);
router.put(Endpoint.USER, updateUser);
router.delete(Endpoint.USER, removeUser);

export default router;
