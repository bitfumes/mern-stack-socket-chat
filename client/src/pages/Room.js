import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";

export default function Room() {
  const params = useParams();
  const { socket } = useOutletContext();

  useEffect(() => {
    socket.emit("join-room", { roomId: params.roomId });
  }, [socket]);

  return <div>Room</div>;
}
