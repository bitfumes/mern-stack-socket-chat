import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function ChatWindow() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("message-from-server", (data) => {
      setChat((prev) => [...prev, data.message]);
    });
  }, [socket]);

  function handleForm(e) {
    e.preventDefault();
    socket.emit("send-message", { message });
    setMessage("");
  }

  return (
    <>
      <Box sx={{ marginBottom: 5 }}>
        {chat.map((message) => (
          <Typography key={message}>{message}</Typography>
        ))}
      </Box>
      <Box component="form" onSubmit={handleForm}>
        <OutlinedInput
          label="Write your message"
          size="small"
          value={message}
          placeholder="Write your message"
          onChange={(e) => setMessage(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" edge="end">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>
    </>
  );
}
