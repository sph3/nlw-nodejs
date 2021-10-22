import { prismaClient } from '../prisma';

export class GetLastThreeMessagesService {
  async execute() {
    const messages = await prismaClient.message.findFirst({
      take: 3,
      orderBy: {
        created_at: 'desc',
      },
      include: {
        user: true,
      },
    });
    return messages;
  }
}
