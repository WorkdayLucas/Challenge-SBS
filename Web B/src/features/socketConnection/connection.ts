import { io } from "socket.io-client";

export const socket = io(process.env.REACT_APP_API || "http://localhost:3001/")

socket.on("connect", () => {
    console.log(socket.connected); // true
});
