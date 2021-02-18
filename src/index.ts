import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { writeNewUserToJson } from "./util/writeJson";
import "express-async-errors";

const users = require("./../data/users.json");
const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/users", (_, res) => {
  return res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const { body } = req;
    const updatedUsers = await writeNewUserToJson(body);
    return res.json(updatedUsers);
  } catch (err) {
    throw new Error(err.message);
  }
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Started listening on ${PORT}`);
});
