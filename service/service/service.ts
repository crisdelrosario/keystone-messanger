import http from 'http';
import { PrismaClient } from '.prisma/client';
import { Server } from 'socket.io';
import { ServiceInterface } from './service.interface';

export type CorsType = {
  allowedOrigins: string[],
  credentials: boolean
};

export default class Service {
  private io: Server;
  private services:Array<ServiceInterface> = [];
  private prisma:PrismaClient;

  constructor(server: http.Server, cors:CorsType, prisma:PrismaClient) {
    this.io = new Server(server, {
      transports: ['polling', 'websocket'],
      cors: cors
    });

    this.prisma = prisma;
  }

  register(service: new (prisma:PrismaClient) => ServiceInterface) {
    this.services.push(new service(this.prisma));
  }

  start() {
    this.services.forEach((service:ServiceInterface) => {
      return service.event(this.io);
    })
  }
}