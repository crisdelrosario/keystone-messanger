import { Server } from "socket.io";

export interface ServiceInterface {
  event(io: Server): void
}