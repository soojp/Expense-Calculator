const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "category is required"],
      minLength: [3, "must be 3 characters or longer"],
    },
    sum: { type: Number },
    rows: [
      {
        name: {
          type: String,
        },
        cost: {
          type: Number,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
