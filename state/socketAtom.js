import { atom } from "recoil";

import io from "socket.io-client";
import { REALTIME_SERVER, REALTIME_SERVER_DEVELOPMENT, SocketEvent } from "../util/constants";
import { deviceInfoState } from "./deviceAtom";

const SOCKET_CONNECTION = process.env.NODE_ENV === "production" ? REALTIME_SERVER : REALTIME_SERVER_DEVELOPMENT;

export const socket = io(SOCKET_CONNECTION, {
  secure: process.env.NODE_ENV === "production" ? true : false,
  autoConnect: false,
});

export const socketConnected = atom({
  key: "socketConnected", // unique ID (with respect to other atoms/selectors)
  default: false,
  effects: [
    async ({ setSelf, getLoadable }) => {
      socket.connect();
      const connected = () => {
        console.log("Socket Connected");
        socket.emit(SocketEvent.DEVICE_INFO, getLoadable(deviceInfoState).contents);
        setSelf(true);
      };
      const disconnected = () => {
        console.log("Socket Disconnected");
        setSelf(false);
      };
      socket.on(SocketEvent.CONNECT, connected);
      socket.on(SocketEvent.DISCONNECT, disconnected);
      return () => {
        socket.disconnect();
        socket.off(SocketEvent.CONNECT, connected);
        socket.off(SocketEvent.DISCONNECT, disconnected);
        setSelf(false);
      };
    },
  ],
});

export const socketMessage = atom({
  key: "socketMessage", // unique ID (with respect to other atoms/selectors)
  default: "",
  effects: [
    ({ setSelf, getLoadable }) => {
      const connected = getLoadable(socketConnected);
      const setMsg = (msg) => setSelf(msg);
      if (connected) {
        socket.on(SocketEvent.MESSAGE, setMsg);
      }
      return () => socket.off(SocketEvent.MESSAGE, setMsg);
    },
  ],
});

export const locationState = atom({
  key: "location",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((location) => {
        if (socket.connected)
          socket.emit(SocketEvent.LOCATION, {
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
          });
      });
    },
  ],
});

export const disconnect = () => socket.disconnect();
export const connect = () => socket.connect();
