import { Schema } from 'mongoose';
import dayjs from 'dayjs';

import { MESSAGE_TYPES } from '../../constants';

export default new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    type: {
      required: true,
      type: String,
      enum: Object.values(MESSAGE_TYPES)
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
