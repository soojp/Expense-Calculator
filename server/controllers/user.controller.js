const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const User = require("../models/user.model");

const register = async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    const userToken = jwt.sign(
      { _id: newUser._id, email: newUser.email, username: newUser.username },
      SECRET
    );
    res
      .status(201)
      .cookie("userToken", userToken, {
        expires: new Date(Date.now() + 900000),
      })
      .json({ successMessage: "user created", user: newUser });
  } catch (err) {
    console.log("Error Registering", err);
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  const userDocument = await User.findOne({ username: req.body.username });
  if (!userDocument) {
    res
      .status(400)
      .json({ error: "Invalid username/password. Please try again." });
  } else {
    try {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        userDocument.password
      );
      if (!isPasswordValid) {
        res
          .status(400)
          .json({ error: "Invalid username/password. Please try again." });
      } else {
        const userToken = jwt.sign(
          {
            _id: userDocument._id,
            email: userDocument.email,
            username: userDocument.username,
          },
          SECRET
        );
        res
          .status(201)
          .cookie("userToken", userToken, {
            expires: new Date(Date.now() + 900000),
          })
          .json({ successMessage: "user loggedin", user: userDocument });
      }
    } catch (error) {
      console.log("LOGIN ERROR", error);
      res
        .status(400)
        .json({ error: "Invalid username/password. Please try again." });
    }
  }
};

const logout = (req, res) => {
  res.clearCookie("userToken");
  res.json({ successMessage: "User logged out" });
};

const getLoggedInUser = async (req, res) => {
  try {
    const user = jwt.verify(req.cookies.userToken, SECRET);
    const currentUser = await User.findOne({ _id: user._id });
    res.json(currentUser);
  } catch (error) {
    res.status(401).json({ error });
  }
};

module.exports = {
  register,
  login,
  logout,
  getLoggedInUser,
};
