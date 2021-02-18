import { readJson } from "fs-extra";
import { User } from "../types/user";
import { USER_FILE_PATH } from "../constants";

export async function getAllUsers(): Promise<User[]> {
  const users = readJson(USER_FILE_PATH);
  return users;
}
