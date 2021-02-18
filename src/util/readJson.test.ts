import { getAllUsers } from "./readJson";
const users = require("../../data/users.json");
const trimmedUsers = users.splice(0, 4);

jest.mock("fs-extra", () => ({
  readJson: () => trimmedUsers,
}));

describe("readJson module", () => {
  it("should get the entire list of users from json", async () => {
    const result = await getAllUsers();

    expect(result).toHaveLength(4);
    expect(JSON.stringify(result)).toMatch(JSON.stringify(trimmedUsers));
  });
});
