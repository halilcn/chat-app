import handler from '@shared/handler';

const test = handler(async (req, res, next) => {
  res.send('okey')
});

export default {
  test
};
