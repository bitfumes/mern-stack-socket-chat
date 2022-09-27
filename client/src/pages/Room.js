import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import ChatWindow from "../components/ChatWindow.js";

export default function Room() {
  const params = useParams();
  const { socket } = useOutletContext();

  useEffect(() => {
    if (!socket) return;
    socket.emit("join-room", { roomId: params.roomId });
  }, [socket]);

  return <ChatWindow />;
}
