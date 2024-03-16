const { Schema, model } = require("mongoose");
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: null,
  }
);

const UserModel = model("User", UserSchema);
module.exports = UserModel;
