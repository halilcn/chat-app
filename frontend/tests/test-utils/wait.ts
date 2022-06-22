export default async (time: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};
