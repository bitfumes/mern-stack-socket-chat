import express from "express";

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.json({ data: "hello world from socket" });
});

app.listen(PORT, () => {
  console.log("Server is running at http://localhost:4000");
});
