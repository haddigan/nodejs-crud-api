import path from "path";
import { writeJson, readJson } from "fs-extra";
import { User } from "../types/user";

const FILE_PATH = path.resolve(__dirname, "../../data/users.json");

export async function writeNewUserToJson(newUserData: User) {
  try {
    const users = await readJson(FILE_PATH);
    const updatedUsers = [...users, newUserData];
    await writeJson(FILE_PATH, updatedUsers);
    return updatedUsers;
  } catch (err) {
    throw new Error(err);
  }
}
