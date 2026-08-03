import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { firstname, surname, email, password } = req.body;

    if (!firstname || !surname || !email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Provide a valid email" });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8 characters long and contain one uppercase and one lowercase character, a number, and a special character.",
      });
    }

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salts = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salts);

    const createUser = await User.create({
      firstname,
      surname,
      email,
      password: hashedPassword,
    });

    res.status(201).json(createUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email or password" });
    }

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({ message: "This user does not exist" });
    }

    const passwordCheck = await bcrypt.compare(password, foundUser.password);

    if (!passwordCheck) {
      return res.status(400).json({ message: "Password incorrect" });
    }

    const token = await jwt.sign(
      {
        firstname: foundUser.firstname,
        surname: foundUser.surname,
        email: foundUser.email,
        id: foundUser.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { algorithm: "HS256", expiresIn: "1h" },
    );

    delete foundUser._doc.password;

    res
      .status(200)
      .json({ message: "Logged in succesfully", token, user: foundUser });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getAllUsers, register, login };
