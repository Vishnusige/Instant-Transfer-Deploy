require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User, Account } = require("./models/user");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/instanttransfer";

const demoUsers = [
  {
    userName: "john.doe@gmail.com",
    firstName: "John",
    lastName: "Doe",
    password: "password123",
    balance: 500,
  },
  {
    userName: "jane.smith@gmail.com",
    firstName: "Jane",
    lastName: "Smith",
    password: "password123",
    balance: 1200,
  },
  {
    userName: "alex.jones@gmail.com",
    firstName: "Alex",
    lastName: "Jones",
    password: "password123",
    balance: 350,
  },
  {
    userName: "sarah.connor@gmail.com",
    firstName: "Sarah",
    lastName: "Connor",
    password: "password123",
    balance: 2500,
  },
  {
    userName: "bruce.wayne@gmail.com",
    firstName: "Bruce",
    lastName: "Wayne",
    password: "password123",
    balance: 100000,
  }
];

const seedDB = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected successfully!");

    // Clear existing users and accounts (except the ones you registered, or clear all for fresh demo)
    console.log("Cleaning up old demo data...");
    // Only delete the demo users to avoid losing your own registered account
    const emailsToDelete = demoUsers.map(u => u.userName);
    const usersToDelete = await User.find({ userName: { $in: emailsToDelete } });
    const userIdsToDelete = usersToDelete.map(u => u._id);
    
    await User.deleteMany({ userName: { $in: emailsToDelete } });
    await Account.deleteMany({ userId: { $in: userIdsToDelete } });

    console.log("Seeding new demo users...");
    for (const u of demoUsers) {
      // Hash password
      const hashedPassword = await bcrypt.hash(u.password, 10);
      
      // Save User
      const user = new User({
        userName: u.userName,
        firstName: u.firstName,
        lastName: u.lastName,
        password: hashedPassword
      });
      await user.save();

      // Save Account
      const account = new Account({
        userId: user._id,
        balance: u.balance
      });
      await account.save();
      
      console.log(`Added: ${u.firstName} ${u.lastName} with balance $${u.balance}`);
    }

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
