import { Request, response, Response } from 'express';
import { AuthUserService } from '../services/AuthUserService';

export class AuthUserController {
  async handle(req: Request, res: Response) {
    const { code } = req.body;
    const service = new AuthUserService();

    try {
      const result = await service.execute(code);
      return res.json(result);
    } catch (err) {
      return res.json({ error: err.message });
    }
  }
}
