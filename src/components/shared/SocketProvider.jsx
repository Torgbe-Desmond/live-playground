import { useSocket } from "../../hooks/useSocket";

export default function SocketProvider({ children }) {
  useSocket(); // initializes socket listeners
  return children;
}
