import { Schema } from 'mongoose';
import dayjs from 'dayjs';

export default new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      required: true
    },
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
      required: true,
      default: dayjs()
    }
  },
  {
    timestamps: true
  }
);
