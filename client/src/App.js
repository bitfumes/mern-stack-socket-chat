import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import Header from "./components/Header";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  return (
    <div>
      <Container>
        <Header socket={socket} />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Outlet context={{ socket }} />
        </Box>
      </Container>
    </div>
  );
}

export default App;
