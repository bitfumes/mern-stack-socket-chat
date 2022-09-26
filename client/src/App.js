import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
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
    <div>
      <Container>
        <Box sx={{ marginBottom: 5 }}>
          {chat.map((message) => (
            <Typography key={message}>{message}</Typography>
          ))}
        </Box>
        <Box component="form" onSubmit={handleForm}>
          <TextField
            size="small"
            label="Write your message"
            variant="standard"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="text" type="submit">
            Send
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default App;
