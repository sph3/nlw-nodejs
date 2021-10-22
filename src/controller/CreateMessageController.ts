import { Request, Response } from 'express';

export class CreateMessageController {
  async handle(req: Request, res: Response) {
    const { message } = req.body;
  }
}
