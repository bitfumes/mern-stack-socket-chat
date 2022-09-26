import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Container>
        <Header />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Outlet />
        </Box>
      </Container>
    </div>
  );
}

export default App;
