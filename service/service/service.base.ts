import { PrismaClient } from '.prisma/client';

export class ServiceBase {
  constructor(private prisma:PrismaClient) {
  }
}