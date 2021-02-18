import {
  getAllUsers,
  getPaginatedUsers,
  getSortedResults,
  SortDirection,
  SortType,
} from "./readJson";

import fs from "fs-extra";
import { User } from "../types/user";

const users = require("../../data/users.json");
const trimmedUsers = users.slice(0, 4);
const usersLength = users.length;

describe("readJson module", () => {
  test("getAllUsers should get the entire list of users from json", async () => {
    const result = await getAllUsers();
    const trimmedResult = result.slice(0, 4);
    expect(result).toHaveLength(usersLength);
    expect(JSON.stringify(trimmedResult)).toMatch(JSON.stringify(trimmedUsers));
  });

  it.each([
    ["email", "ascending", "C"],
    ["email", "descending", "D"],
    ["name", "ascending", "A"],
    ["name", "descending", "B"],
  ])(
    "getSortedUsers should return sorted users",
    async (type, direction, expected) => {
      const originalReadJson = fs.readJson;
      const mockReadJson = jest.fn(async () => {
        const address = {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        };
        return [
          { name: "A", email: "C", dateOfBirth: "", phoneNumber: "", address },
          { name: "B", email: "D", dateOfBirth: "", phoneNumber: "", address },
        ];
      });

      fs.readJson = mockReadJson;

      const result = await getSortedResults(
        type as SortType,
        direction as SortDirection
      );

      expect(result[0][type as SortType]).toBe(expected);

      fs.readJson = originalReadJson;
    }
  );

  describe("getPaginatedUsers", () => {
    it.each([
      [5, 3],
      [2, 10],
      [5, 5],
    ])("should get paginated user data", async (page, length) => {
      const result = await getPaginatedUsers(page, length);
      const firstResult = users[(page - 1) * length];
      expect(result[0]).toMatchObject(firstResult);
      expect(result).toHaveLength(length);
    });

    it("should properly handle out of bounds requests", async () => {
      const outOfBoundsResult = await getPaginatedUsers(100, 5);

      expect(outOfBoundsResult).toHaveLength(0);
    });
  });
});
