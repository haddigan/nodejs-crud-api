import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import {
  removeUserFromJson,
  updateUserInJson,
  writeNewUserToJson,
} from "./util/writeJson";
import {
  getAllUsers,
  getPaginatedUsers,
  getSortedUsers,
  SortType,
  SortDirection,
} from "./util/readJson";
import { validate } from "./util/validate";
import "express-async-errors";

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const { query } = req;

    const page = query?.page as string | undefined;
    const limit = query?.limit as string | undefined;
    const sortBy = query?.sortBy as SortType | undefined;

    if (page && limit) {
      const pageInt = parseInt(page);
      const limitInt = parseInt(limit);
      const users = await getPaginatedUsers(pageInt, limitInt);
      return res.json(users);
    }

    if (limit && !page) {
      const pageInt = 1;
      const limitInt = parseInt(limit);
      const users = await getPaginatedUsers(pageInt, limitInt);
      return res.json(users);
    }

    if (sortBy) {
      if (sortBy !== "email" && sortBy !== "name") {
        throw new Error("Invalid sort parameter");
      }
      const sortDirection = query?.sortDirection as SortDirection | undefined;
      const users = await getSortedUsers(sortBy, sortDirection);
      return res.json(users);
    }

    const users = await getAllUsers();
    return res.json(users);
  } catch (err) {
    throw new Error(err.message);
  }
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
