import { PrismaClient } from '.prisma/client';

export type MessageType = {
  id: string
  conversation: string
  sender: string
  receiver: string
  message: string
  created: number
}

export class Message {
  private messages:Array<MessageType> = [];
  
  constructor(private prisma:PrismaClient) {
  }

  store(to: string, message: string) {
  }

  /**
   * @function list
   * @returns 
   */
  list():Array<MessageType> {
    return this.messages;
  }
}