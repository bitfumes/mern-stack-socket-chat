import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("message-from-server", (data) => {
      console.log("messaged recieved", data);
    });
  }, [socket]);

  function handleForm(e) {
    e.preventDefault();
    socket.emit("send-message", { message });
    setMessage("");
  }

  return (
    <div>
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
    </div>
  );
}

export default App;
