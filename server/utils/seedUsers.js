const bcrypt = require("bcrypt");
const User = require("../models/User");

async function ensureSeedUsers() {
  // list of users to seed
  const seedUsers = [
    {
      name: "Justin Bouffard",
      email: "justin.bouffard@example.com",
      password: "1234",
      role: "admin",
    },
    {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "1234",
      role: "user",
    },
  ];

  for (const seedUser of seedUsers) {
    const existingUser = await User.findOne({ email: seedUser.email });

    if (!existingUser) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(seedUser.password, salt);

      await User.create({
        name: seedUser.name,
        email: seedUser.email,
        passwordHash,
        role: seedUser.role,
      });

      console.log(`User created: ${seedUser.email}`);
    }
  }
}

module.exports = ensureSeedUsers;
