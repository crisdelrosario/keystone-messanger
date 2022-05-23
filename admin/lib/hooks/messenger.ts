import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { app as config } from '../../../service/config';

const Event = {
  USERS: "users",
  MESSAGE: "message",
  MESSAGES: "messages"
}

type FuncSendMessage = (id:string, message:string) => void
type FuncLoadMore = (id:string) => void

/**
 * @function useSocket
 * @returns 
 */
export const useSocket = (id: string):[Socket | undefined] => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const _socket = io(config.serviceUrl, {
      transports: ['polling', 'websocket'],
      autoConnect: false
    });

    _socket.auth = {
      user: {
        id
      }
    }

    _socket.connect();

    setSocket(_socket);

  }, [id, setSocket]);

  return [
    socket
  ]
}

/**
 * @function onUsers
 * @param socket 
 */
const onUsers = (socket: Socket) => {
  socket.on(Event.USERS, data => {
    console.log("USERS", data);
  });
}

/**
 * @function onMessage
 * @param socket 
 */
const onMessage = (socket: Socket) => {
  socket.on(Event.MESSAGE, data => {
    console.log("MESSAGE", data);
  });
}

const onMessages = (socket: Socket) => {
  socket.on(Event.MESSAGES, data => {
    console.log("MESSAGES", data);
  })
}

/**
 * @function useMessanger
 * @returns 
 */
export const useMessanger = (id: string):[
  Array<string>,
  FuncSendMessage,
  FuncLoadMore
] => {
  const [socket] = useSocket(id);
  const [messages, setMessages] = useState<Array<string>>([]);

  useEffect(() => {
    if (socket) {
      onUsers(socket);
      onMessage(socket);
      onMessages(socket);
    }
  }, [socket, setMessages]);

  const sendMessage = (to: string, message: string) => {
    console.log("Trying to send message %o", {to, message});
    if (socket) {
      console.log("Sending message");
      socket.emit(Event.MESSAGE, ({message, to}));
    }
  }

  const loadMore = (id: string) => {
    return null;
  }

  return [
    messages,
    sendMessage,
    loadMore
  ]
}