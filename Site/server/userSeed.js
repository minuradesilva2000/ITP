import User from './models/User.js';
import bcrypt from 'bcrypt';
import connectToDatabase from './db/db.js';

const userRegister = async () => {
  try {
    await connectToDatabase();
    /* define hashpassword */
    /*bcrpy kiyanne  hashpassword walata ganna common library   aharaha password aka change kirima karanawa */
    // Hash the password 'admin' with 10 salt rounds
    const hashPassword = await bcrypt.hash("admin", 10);
    /*hashpassword kiyana function aka use karala thamay password aka hash widiyata thiyanne */
    /*bcrypt.hash() method ake parameter  wenne data and  saltRounds   */
    /* data kiyanne  hash karanulabana password aka */
    /*saltRounds widiyata denne  hash karanulabana  salt round pramanaya */
    const newUser = new User({
      /*define user properties for admin */
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin"
    });
    await newUser.save();
    console.log("Admin user created.");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

userRegister();