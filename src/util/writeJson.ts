import path from "path";
import { writeJson, readJson } from "fs-extra";
import { User } from "../types/user";

const FILE_PATH = path.resolve(__dirname, "../../data/users.json");

export async function writeNewUserToJson(newUserData: User): Promise<User[]> {
  try {
    const users = await readJson(FILE_PATH);
    const updatedUsers = [...users, newUserData];
    await writeJson(FILE_PATH, updatedUsers);
    return updatedUsers;
  } catch (err) {
    throw new Error(err);
  }
}

export async function updateUserInJson(
  emailAddress: string,
  updateUserData: User
): Promise<User | null> {
  try {
    const users = await readJson(FILE_PATH);
    const currentUserIndex = users.findIndex(
      (user: User) => user.email === emailAddress
    );

    if (currentUserIndex > -1) {
      users[currentUserIndex] = updateUserData;
      await writeJson(FILE_PATH, users);
      return updateUserData;
    }
    return null;
  } catch (err) {
    throw new Error(err.message);
  }
}
