import { Schema, model } from 'mongoose';

import messages from '@models/schematics/messages';

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
    messages: [messages]
  },
  {
    timestamps: true
  }
);

export default model('Message', Message);
