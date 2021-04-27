
import io from "socket.io-client"
const SOCKET_URL = "/";

//socket connection
console.log("new socket connection");
export const socket = io(SOCKET_URL);