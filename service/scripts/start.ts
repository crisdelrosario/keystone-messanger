import "dotenv/config";

import express from "express";
import { createServer, Server } from "http";
import { PrismaClient } from '.prisma/client';
import cors from 'cors';

import config from './config';
import Service from "../service/service";
import { prisma } from "../db";
import { Messenger } from "../messenger";

export const createExpressServer = ():Server => {
  console.log('✨ Creating server');

  const expressApp = express();

  expressApp.use(cors(config?.cors));
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({extended: true}));

  return createServer(expressApp);
}

const createService = (expressServer:Server, prisma: PrismaClient) => {
  const service = new Service(expressServer, config?.cors, prisma);
  service.register(Messenger);
  service.start();
}

const start = async () => {
  console.log('✨ Starting services');

  const expressServer = createExpressServer();
  createService(expressServer, prisma);

  const port = 1337;
  expressServer.listen(port, (err?: any) => {
    if (err) throw err;
    console.log(`⭐️ Service Server Ready on http://localhost:${port}`);
  });
};
 
export default start;