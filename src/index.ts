import express from "express";
import { errorHandler } from "./middleware/errorHandler";

const users = require("./../data/users.json");
const PORT = 3000;
const app = express();

app.get("/", (_: any, res) => {
  return res.send("Hello world");
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Started listening on ${PORT}`);
});
