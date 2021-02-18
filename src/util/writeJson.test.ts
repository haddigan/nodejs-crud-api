import fs from "fs-extra";
import { User } from "../types/user";
import {
  writeNewUserToJson,
  updateUserInJson,
  removeUserFromJson,
} from "./writeJson";
import { USER_FILE_PATH } from "../constants";
const users = require("../../data/users.json");

jest.mock("fs-extra");

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

afterEach(() => {
  jest.restoreAllMocks();
});

describe("writeJson module", () => {
  it("writes a new user", async () => {
    const mockedReadJson = fs.readJson as jest.Mock;

    mockedReadJson.mockImplementationOnce(() => users.slice(0, 4));
    const result = await writeNewUserToJson(user);

    expect(result).toHaveLength(5);
    expect(result[4]).toMatchObject(user);
    expect(fs.writeJson).toBeCalledWith(USER_FILE_PATH, result);
  });

  it("updates a specific user", async () => {
    const userToEdit = users[0].email;

    const result = await updateUserInJson(userToEdit, user);

    expect(result).toMatchObject(user);
    expect(fs.writeJson).toBeCalled();
  });

  it("removes a user from the list", async () => {
    const userToRemove = users[0].email;

    const resultTrue = await removeUserFromJson(userToRemove);
    const resultFalse = await removeUserFromJson("foo@bar.com");

    expect(resultTrue).toBe(true);
    expect(resultFalse).toBe(false);
    expect(fs.writeJson).toBeCalled();
  });
});
