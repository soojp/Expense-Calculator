const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      index: {
        unique: true,
        dropDups: true,
      },
    },
    username: {
      type: String,
      required: [true, "Username is required."],
      minLength: [3, "Username must be 3 characters or longer."],
      index: {
        unique: true,
        dropDups: true,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords must match");
  }
  next();
});

UserSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log("ERROR SAVING", error);
  }
});

module.exports = mongoose.model("User", UserSchema);
