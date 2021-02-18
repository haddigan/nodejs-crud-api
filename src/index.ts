import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import {
  removeUserFromJson,
  updateUserInJson,
  writeNewUserToJson,
} from "./util/writeJson";
import { validate } from "./util/validate";
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

    const isValidInput = validate(body);
    if (!isValidInput) throw new Error("Malformed input data");

    const updatedUsers = await writeNewUserToJson(body);
    return res.json(updatedUsers);
  } catch (err) {
    throw new Error(err.message);
  }
});

app.put("/user/:emailAddress", async (req, res) => {
  try {
    const {
      body,
      params: { emailAddress },
    } = req;

    const isValidInput = validate(body);
    if (!isValidInput) throw new Error("Malformed input data");

    const updatedUser = await updateUserInJson(emailAddress, body);
    return res.json(updatedUser);
  } catch (err) {
    throw new Error(err.message);
  }
});

app.delete("/user/:emailAddress", async (req, res) => {
  try {
    const {
      params: { emailAddress },
    } = req;

    const isDeleted = await removeUserFromJson(emailAddress);
    return res.send(isDeleted);
  } catch (err) {
    throw new Error(err.message);
  }
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Started listening on ${PORT}`);
});
