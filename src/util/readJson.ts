import { readJson } from "fs-extra";
import { User } from "../types/user";
import { USER_FILE_PATH } from "../constants";

export async function getAllUsers(): Promise<User[]> {
  const users = readJson(USER_FILE_PATH);
  return users;
}

export async function getPaginatedUsers(page: number, limit: number) {
  const pageIndex = page - 1;
  const users = await readJson(USER_FILE_PATH);
  const initialIndex = pageIndex * limit;
  const finalIndex = initialIndex + limit;

  if (initialIndex > users.length) return [];

  return users.slice(initialIndex, finalIndex);
}
