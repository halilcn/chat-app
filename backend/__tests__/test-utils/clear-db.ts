import mongoose from 'mongoose';

export default async () => {
  const collections = await mongoose.connection.db?.collections();
  if (!collections) return;
  for (const connection of collections) {
    await connection.deleteMany({});
  }
};
