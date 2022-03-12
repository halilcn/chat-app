import { Schema, model } from 'mongoose';

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    nameSurname: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model('User', User);
