export const REALTIME_SERVER = "http://192.168.0.108:8000";
export const REALTIME_SERVER_DEVELOPMENT = "http://192.168.0.108:8000";

export const SocketEvent = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  MESSAGE: "message",
  LOCATION: "location",
  DEVICE_INFO: "device-info",
};
Object.freeze(SocketEvent);
