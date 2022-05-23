import { ServiceBase } from "../service/service.base";

import { PrismaClient } from '.prisma/client';
import { ServiceInterface } from "../service/service.interface";
import { Server, Socket } from "socket.io";
import { User } from "./user";
import { Message } from "./message";

export const Event = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  USERS: "users",
  MESSAGE: "message",
  MESSAGES: "messages"
}

export class Messenger extends ServiceBase implements ServiceInterface {
  private user:User;
  private message:Message;

  constructor(prisma:PrismaClient) {
    super(prisma);
    this.user = new User(prisma);
    this.message = new Message(prisma);
  }

  /**
   * @function onAuthenticate
   * @param socket 
   */
  onAuthenticate(socket:Socket) {
    console.info('INFO: Auth', socket.handshake.auth);
  }

  /**
   * @function onDisconnect
   * @param socket 
   */
  onDisconnect(socket:Socket) {
    socket.on(Event.DISCONNECT, (reason:any) => {
      console.info("INFO: Client disconnected", reason);
    })
  }

  /**
   * @function onConnection
   * @param io 
   * @param callback 
   */
  onConnection(io:Server, callback:(socket:Socket) => void) {
    io.on(Event.CONNECTION, (socket:Socket) => {
      console.info("INFO: Client connected");

      const { user } = socket.handshake.auth;
      if (!this.user.has(user.id)) {
        this.user.insert(user.id, socket);
      }

      socket.join(user.id);

      this.onDisconnect(socket);

      socket.emit(Event.USERS, this.user.list());

      callback(socket);
    })
  }

  /**
   * @function onMessages
   * @param socket 
   */
  onMessages(socket:Socket) {
    socket.on(Event.MESSAGES, () => {
      console.info('INFO: message list requested')
    });
  }

  /**
   * @function onMessage
   * @param socket 
   */
  onMessage(socket:Socket) {
    socket.on(Event.MESSAGE, (message:string, to:string) => {
      console.info('INFO: Got message', message, to);

      socket.to(to).emit(Event.MESSAGE, message);
      socket.emit(Event.MESSAGE, message);
    })
  }

  /**
   * @function event
   * @param io 
   */
  event(io: Server): void {
    io.use((socket, next) => {
      this.onAuthenticate(socket);
      next();
    });

    this.onConnection(io, (socket:Socket) => {
      this.onMessage(socket);
      this.onMessages(socket);
    });
  }
}