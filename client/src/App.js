import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  return (
    <div>
      Hello Socket
      <Button variant="text">Text</Button>
    </div>
  );
}

export default App;
