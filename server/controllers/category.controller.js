const Category = require("../models/category.model");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const User = require("../models/user.model");

module.exports = {
  getCategories: (req, res) => {
    Category.find({})
      .populate("createdBy", "username email")
      .then((categories) => {
        res.json(categories);
      })
      .catch((err) => {
        console.log("ERROR IN Getting categories", err);
        res.status(400).json({
          message: "something went wrong in finding all categories",
          error: err,
        });
      });
  },
  getCategoriesByUser: (req, res) => {
    User.findOne({ username: req.params.username }).then((user) => {
      Category.find({ createdBy: user._id })
        .populate("createdBy", "username email")
        .then((categories) => {
          res.json(categories);
        })
        .catch((err) => {
          console.log("ERROR IN Get all", err);
          res.status(400).json({
            message: "something went wrong in find all categories",
            error: err,
          });
        })
        .catch((err) => {
          console.log("ERROR IN Get all", err);
          res.status(400).json({
            message: "something went wrong in find all categories by user",
            error: err,
          });
        });
    });
  },
  getCategoryById: (req, res) => {
    Category.findOne({ _id: req.params.id })
      .then((category) => {
        res.json(category);
      })
      .catch((err) => {
        console.log("ERROR IN Getting category", err);
        res.status(400).json({
          message: "something went wrong in finding the category",
          error: err,
        });
      });
  },
  createCategory: (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET);
    Category.create({ ...req.body, createdBy: user._id })
      .then((newCategory) => {
        res.status(201).json(newCategory);
      })
      .catch((err) => {
        console.log("ERROR IN Creating category", err);
        console.log(err.name);

        res.status(400).json({
          message: "something went wrong in creating category",
          error: err,
        });
      });
  },
  updateCategory: (req, res) => {
    Category.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((category) => {
        res.json(category);
      })
      .catch((err) => {
        console.log("ERROR IN Updating category", err);

        res.status(400).json({
          message: "something went wrong in updating category",
          error: err,
        });
      });
  },
  deleteCategory: (req, res) => {
    Category.deleteOne({ _id: req.params.id })
      .then((category) => {
        res.json(category);
      })
      .catch((err) => {
        console.log("ERROR IN Deleting category", err);
        res.status(400).json({
          message: "something went wrong in deleting category",
          error: err,
        });
      });
  },
};
