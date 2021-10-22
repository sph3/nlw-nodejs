import { Request, Response } from 'express';
import { AuthUserService } from '../service/AuthUserService';

export class AuthUserController {
  async handle(req: Request, res: Response) {
    const service = new AuthUserService();
    // service.execute();
  }
}
