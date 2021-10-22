import { Router } from 'express';
import { AuthUserController } from './controller/AuthUserController';
import { CreateMessageController } from './controller/CreateMessageController';
import { ensureAuthenticated } from './middleware/ensureAuthenticated';

export const router = Router();

router.post('/auth', new AuthUserController().handle);
router.post(
  '/messages',
  ensureAuthenticated,
  new CreateMessageController().handle
);
