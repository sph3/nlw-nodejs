import { Router } from 'express';
import { AuthUserController } from './controller/AuthUserController';
import { CreateMessageController } from './controller/CreateMessageController';
import { GetLastThreeMessagesController } from './controller/GetLastThreeMessagesController';
import { UserProfileController } from './controller/UserProfileController';
import { ensureAuthenticated } from './middleware/ensureAuthenticated';

export const router = Router();

router.post('/auth', new AuthUserController().handle);
router.post(
  '/messages',
  ensureAuthenticated,
  new CreateMessageController().handle
);
router.get('/messages/last3', new GetLastThreeMessagesController().handle);
router.get('/profile', ensureAuthenticated, new UserProfileController().handle);
