process.env.DATABASE_URL = 'file:./keystone.db';

import { PrismaClient } from '.prisma/client';

export const prisma:PrismaClient = new PrismaClient();
