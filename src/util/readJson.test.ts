import { getAllUsers, getPaginatedUsers } from "./readJson";
const users = require("../../data/users.json");
const trimmedUsers = users.slice(0, 4);
const usersLength = users.length;

describe("readJson module", () => {
  it("getAllUsers should get the entire list of users from json", async () => {
    const result = await getAllUsers();
    const trimmedResult = result.slice(0, 4);
    expect(result).toHaveLength(usersLength);
    expect(JSON.stringify(trimmedResult)).toMatch(JSON.stringify(trimmedUsers));
  });

  describe("getPaginatedUsers", () => {
    it.each([
      [5, 3],
      [2, 10],
      [5, 5],
    ])("should get paginated user data", async (PAGE, LENGTH) => {
      const result = await getPaginatedUsers(PAGE, LENGTH);
      const firstResult = users[(PAGE - 1) * LENGTH];
      expect(result[0]).toMatchObject(firstResult);
      expect(result).toHaveLength(LENGTH);
    });

    it("should properly handle out of bounds requests", async () => {
      const outOfBoundsResult = await getPaginatedUsers(100, 5);

      expect(outOfBoundsResult).toHaveLength(0);
    });
  });
});
