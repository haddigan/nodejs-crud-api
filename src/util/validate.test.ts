import { validate, validateAddress } from "./validate";

describe("validate module", () => {
  it.each([
    [{}, false],
    [
      {
        street: "1725 Slough Ave",
        city: "Scranton",
        zipCode: "18504",
        country: "United States",
      },
      false,
    ],
    [
      {
        city: "Scranton",
        state: "Pennsylvania",
        country: "United States",
      },
      false,
    ],
    [
      {
        street: "1725 Slough Ave",
        city: "Scranton",
        state: "Pennsylvania",
        zipCode: "18504",
        country: "United States",
      },
      true,
    ],
  ])("validates an address has all required properties", (input, expected) => {
    const result = validateAddress(input);
    expect(result).toBe(expected);
  });

  it.each([
    [
      {
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
      },
      true,
    ],
    [
      {
        email: "mscott@dundermifflin.com",
        dateOfBirth: "1964-03-15T00:59:47.660Z",
        phoneNumber: "555-1234",
        address: {
          street: "1725 Slough Avenue",
          city: "Scranton",
          state: "Pennsylvania",
          zipCode: "18504",
          country: "United States",
        },
      },
      false,
    ],
    [
      {
        email: "mscott@dundermifflin.com",
        address: {
          street: "1725 Slough Avenue",
          city: "Scranton",
          state: "Pennsylvania",
          zipCode: "18504",
          country: "United States",
        },
      },
      false,
    ],
    [
      {
        email: "mscott@dundermifflin.com",
        name: "Michael Scott",
        dateOfBirth: "1964-03-15T00:59:47.660Z",
        phoneNumber: "555-1234",
        address: {
          street: "1725 Slough Avenue",
          zipCode: "18504",
          country: "United States",
        },
      },
      false,
    ],
  ])(
    "validates a user input has all required properties",
    (input, expected) => {
      const result = validate(input);
      expect(result).toBe(expected);
    }
  );
});
