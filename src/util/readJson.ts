import { readJson } from "fs-extra";
import { User } from "../types/user";
import { USER_FILE_PATH } from "../constants";

export type SortType = "name" | "email";
export type SortDirection = "ascending" | "descending" | undefined;

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

export async function getSortedUsers(
  sortType: SortType,
  sortDirection: SortDirection = "ascending"
) {
  const users: User[] = await readJson(USER_FILE_PATH);
  return users.sort((a, b) => {
    const first = a[sortType].toUpperCase();
    const next = b[sortType].toUpperCase();
    const isGreater = first < next;
    const isLesser = first > next;

    if (isGreater && sortDirection === "ascending") return -1;
    if (isLesser && sortDirection === "ascending") return 1;

    if (isGreater && sortDirection === "descending") return 1;
    if (isLesser && sortDirection === "descending") return -1;

    return 0;
  });
}
