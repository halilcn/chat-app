export default async (db: any) => {
  await db.connection.close();
};
