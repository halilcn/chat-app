import mongoose from 'mongoose';

export default async () => {
  const collections = await mongoose.connection.collections;
  if (!collections) return;
  await Promise.all(
    Object.values(collections).map(async collection => {
      await collection.deleteMany({});
    })
  );
};
