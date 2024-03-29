import { Schema, model } from 'mongoose';
import dayjs from 'dayjs';

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    image: {
      type: String,
      required: true,
      default: 'https://www.fakepersongenerator.com/Face/female/female20151024152487152.jpg'
    },
    nameSurname: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    lastActive: {
      type: Date,
      required: false,
      default: dayjs()
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model('User', User);
