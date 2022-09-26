import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { v4 as uuidv4 } from "uuid";

export default function Header() {
  const roomId = uuidv4();
  return (
    <Card sx={{ marginTop: 5, backgroundColor: "gray" }} raised>
      <Link to="/">
        <Button sx={{ color: "white", textDecoration: "none" }} variant="text">
          Home
        </Button>
      </Link>
      <Link to="/chats">
        <Button sx={{ color: "white", textDecoration: "none" }} variant="text">
          Chats
        </Button>
      </Link>
      <Link to={`/room/${roomId}`}>
        <Button sx={{ color: "white", textDecoration: "none" }} variant="text">
          Room1
        </Button>
      </Link>
    </Card>
  );
}
