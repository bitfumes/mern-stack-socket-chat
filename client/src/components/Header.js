import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Cookies from "js-cookies";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Header({ socket, userId, setUserId }) {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  function createNewRoom() {
    const roomId = uuidv4();
    navigate(`/room/${roomId}`);
    socket.emit("new-room-created", { roomId, userId });
    // setRooms([...rooms, { roomId, name: "Test", _id: "testId" }]);
  }

  useEffect(() => {
    async function fetchRooms() {
      const res = await fetch("http://localhost:4000/rooms");
      const { rooms } = await res.json();
      setRooms(rooms);
    }
    fetchRooms();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("new-room-created", ({ room }) => {
      setRooms([...rooms, room]);
    });

    socket.on("room-removed", ({ roomId }) => {
      setRooms(rooms.filter((room) => room.roomId !== roomId));
    });
  }, [socket]);

  function login() {
    const userId = uuidv4();
    setUserId(userId);
    Cookies.setItem("userId", userId);
    navigate("/");
  }

  function logout() {
    setUserId(null);
    Cookies.removeItem("userId");
    navigate("/");
  }

  return (
    <Card sx={{ marginTop: 5, backgroundColor: "gray" }} raised>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Link style={{ textDecoration: "none" }} to="/">
            <Button sx={{ color: "white" }} variant="text">
              Home
            </Button>
          </Link>

          {rooms.map((room) => (
            <Link
              key={room.roomId}
              style={{ textDecoration: "none" }}
              to={`/room/${room.roomId}`}
            >
              <Button sx={{ color: "white" }} variant="text">
                {room.name}
              </Button>
            </Link>
          ))}
        </Box>

        <Box>
          {userId && (
            <>
              <Button
                sx={{ color: "white" }}
                variant="text"
                onClick={createNewRoom}
              >
                New Room
              </Button>
              <Button sx={{ color: "white" }} variant="text" onClick={logout}>
                Logout
              </Button>
            </>
          )}

          {!userId && (
            <Button sx={{ color: "white" }} variant="text" onClick={login}>
              Login
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
}
