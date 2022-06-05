import mongoose from 'mongoose';

export default async () => {
  const models = await mongoose.connection.models;
  if (!models) return;

  await Promise.all(
    Object.keys(models).map(async model => {
      const mongooseModel = mongoose.model(model);
      await mongooseModel.deleteMany({});
    })
  );
};
