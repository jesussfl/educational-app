import { io, Socket } from "socket.io-client";
import { create } from "zustand";

const SOCKET_URL = process.env.EXPO_PUBLIC_API_URL;

const useSocketStore = create((set, get) => {
  return {
    socket: null,
    emitMode: "broadcast",
    setEmitMode: (mode) => {
      set({ emitMode: mode });
    },
    /**
     * Emits an event with data.
     *
     * @param event - The name of the event to emit.
     * @param data - The data to send along with the event.
     */
    emit: (event, data) => {
      const { socket } = get();
      if (!socket) return console.error("Socket not connected");
      // This callback response needs to define on server at first.
      // Emit the event with the data and handle the response
      socket.emit(event, data, (response) => {
        // Display an error message if response.ok is false
        console.log("RESPONSE FROM SERVER", response);
      });
    },
    /**
     * Connects to the socket server.
     */
    connect: () => {
      const { socket } = get();
      if (SOCKET_URL === undefined) {
        // Display error message if socket URL is undefined
        return console.error("Socket URL is undefined");
      }
      if (socket) {
        console.log("Socket already connected");
        // Display error message if socket is already connected
      } else {
        console.log("Connecting to socket", SOCKET_URL);
        // const options =
        //     environment === "development"
        //         ? { path: "/api/socket/socketio", addTrailingSlash: false }
        //         : {};
        // Connect to the socket server
        const socket = io(SOCKET_URL);
        socket
          .on("connect", () => {
            console.log("SOCKET CONNECTED!", socket.id);
            // Update the socket in the global state when connected
            set({ socket });
          })
          .on("disconnect", () => {
            console.log("SOCKET DISCONNECTED!");
            // Set socket to null in the global state when disconnected
            set({ socket: null });
          });
      }
    },
    /**
     * Disconnects the socket if it is connected.
     * If the socket is not connected, displays an error message.
     */
    disconnect: () => {
      const { socket } = get();
      if (socket) {
        socket.disconnect();
        set({ socket: null });
      } else {
        console.error("Socket not connected");
      }
    },
  };
});

export default useSocketStore;
