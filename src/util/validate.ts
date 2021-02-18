export function validate(data: any): boolean {
  const requiredFields = [
    "email",
    "name",
    "dateOfBirth",
    "phoneNumber",
    "address",
  ];
  return requiredFields.every((field) => {
    if (field === "address" && data.hasOwnProperty("address")) {
      return validateAddress(data.address);
    }
    return data.hasOwnProperty(field);
  });
}

export function validateAddress(data: any) {
  const requiredFields = ["street", "city", "state", "zipCode", "country"];
  return requiredFields.every((field) => data.hasOwnProperty(field));
}
