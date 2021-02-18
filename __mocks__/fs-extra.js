const users = require("../data/users.json");
module.exports = {
  readJson: jest.fn(() => users),
  writeJson: jest.fn(),
};
