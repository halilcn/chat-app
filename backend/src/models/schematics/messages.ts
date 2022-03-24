import { Schema, model } from 'mongoose';

export default new Schema(
  {
    content: {
      type: String,
      required: true
    },
    readers: [
      {
        type: Schema.Types.ObjectId
      }
    ],
    createdAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);
