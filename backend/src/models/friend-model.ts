import { Schema, model } from 'mongoose';

const Friend = new Schema(
  {
    requester: {
      type: Schema.Types.ObjectId,
      required: true
    },
    recipient: {
      type: Schema.Types.ObjectId,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model('Friend', Friend);
