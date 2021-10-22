import { Router } from 'express';
import { AuthUserController } from './controller/AuthUserController';

export const router = Router();

router.post('/auth', new AuthUserController().handle);
