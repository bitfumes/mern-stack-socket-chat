import { createBrowserRouter } from "react-router-dom";
import App from "./App.js";
import Chats from "./pages/Chats.js";
import Home from "./pages/Home.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/chats",
        element: <Chats />,
      },
    ],
  },
]);

export default router;
