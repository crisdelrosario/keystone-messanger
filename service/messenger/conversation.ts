import { PrismaClient } from '.prisma/client';

export class Conversation {
  constructor(private prisma:PrismaClient) {
  }
}