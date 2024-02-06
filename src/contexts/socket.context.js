import io from "socket.io-client";
import React from "react";
export const socket = io.connect(process.env.EXPO_PUBLIC_API_URL);
export const SocketContext = React.createContext();
