import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
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
      setChat((prev) => [...prev, { message: data.message, received: true }]);
    });
  }, [socket]);

  function handleForm(e) {
    e.preventDefault();
    socket.emit("send-message", { message });
    setChat((prev) => [...prev, { message, received: false }]);
    setMessage("");
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          padding: 2,
          marginTop: 10,
          width: "60%",
          backgroundColor: "gray",
          color: "white",
        }}
      >
        <Box sx={{ marginBottom: 5 }}>
          {chat.map((data) => (
            <Typography
              sx={{ textAlign: data.received ? "left" : "right" }}
              key={data.message}
            >
              {data.message}
            </Typography>
          ))}
        </Box>
        <Box component="form" onSubmit={handleForm}>
          <OutlinedInput
            sx={{ backgroundColor: "white" }}
            size="small"
            fullWidth
            value={message}
            placeholder="Write your message"
            inputProps={{ "aria-label": "search google maps" }}
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
      </Card>
    </Box>
  );
}
