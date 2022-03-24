import { Schema, model } from 'mongoose';

const Message = new Schema(
  {
    friendId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    authorId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    messages: [
      {
        content: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model('Message', Message);
