import { useRecoilValue } from "recoil";
import { socketConnected, socketMessage, locationState, connect, disconnect } from "../state/socketAtom";

export const useSocket = () => {
  const socket = useRecoilValue(socketConnected);
  const msg = useRecoilValue(socketMessage);
  const location = useRecoilValue(locationState);

  return { connected: socket, msg, location, disconnect, connect };
};
