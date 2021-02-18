import path from "path";
import { writeJson, readJson } from "fs-extra";
import { User } from "../types/user";
import { USER_FILE_PATH } from "../constants";

export async function writeNewUserToJson(newUserData: User): Promise<User[]> {
  try {
    const users = await readJson(USER_FILE_PATH);
    const updatedUsers = [...users, newUserData];
    await writeJson(USER_FILE_PATH, updatedUsers);
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
    const users = await readJson(USER_FILE_PATH);
    const currentUserIndex = users.findIndex(
      (user: User) => user.email === emailAddress
    );

    if (currentUserIndex > -1) {
      users[currentUserIndex] = updateUserData;
      await writeJson(USER_FILE_PATH, users);
      return updateUserData;
    }
    return null;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function removeUserFromJson(
  emailAddress: string
): Promise<boolean> {
  try {
    const users = await readJson(USER_FILE_PATH);
    const currentUserIndex = users.findIndex(
      (user: User) => user.email === emailAddress
    );

    if (currentUserIndex > -1) {
      users.splice(currentUserIndex, 1);
      await writeJson(USER_FILE_PATH, users);
      return true;
    }

    return false;
  } catch (err) {
    throw new Error(err.message);
  }
}
