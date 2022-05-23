import { Socket } from 'socket.io';
import { PrismaClient } from '.prisma/client';

export type UserType = {
  id:string
  socket:Socket
}

export class User {
  private users:Array<UserType> = [];

  constructor(private prisma:PrismaClient) {
  }
  
  /**
   * @function insert
   * @param id 
   */
  insert(id:string, socket:Socket) {
    if (this.users.find(user => user.id === id)) {
      throw new Error("User already taken");
    }

    this.users.push({
      id,
      socket
    })
  }

  /**
   * @function list
   * @returns 
   */
  list():Array<string> {
    return this.users.map(user => user.id);
  }

  /**
   * @function has
   * @param id 
   * @returns 
   */
  has(id:string):boolean {
    return this.users.find(user=> user.id === id) ? true : false;
  }
}