import { User } from "../types/user";
import {
  writeNewUserToJson,
  updateUserInJson,
  removeUserFromJson,
} from "./writeJson";

const users = require("../../data/users.json");

jest.mock("fs-extra", () => ({
  readJson: () => users.splice(0, 4),
  writeJson: () => users,
}));

const user: User = {
  email: "mscott@dundermifflin.com",
  name: "Michael Scott",
  dateOfBirth: "1964-03-15T00:59:47.660Z",
  phoneNumber: "555-1234",
  address: {
    street: "1725 Slough Avenue",
    city: "Scranton",
    state: "Pennsylvania",
    zipCode: "18504",
    country: "United States",
  },
};

beforeEach(() => {
  jest.resetAllMocks();
});

describe("writeJson module", () => {
  it("writes a new user", async () => {
    const result = await writeNewUserToJson(user);

    expect(result).toHaveLength(5);
    expect(result[4]).toMatchObject(user);
  });

  it("updates a specific user", async () => {
    const userToEdit = users[0].email;

    const result = await updateUserInJson(userToEdit, user);

    expect(result).toMatchObject(user);
  });

  it("removes a user from the list", async () => {
    const userToRemove = users[0].email;

    const resultTrue = await removeUserFromJson(userToRemove);
    const resultFalse = await removeUserFromJson("foo@bar.com");

    expect(resultTrue).toBe(true);
    expect(resultFalse).toBe(false);
  });
});
