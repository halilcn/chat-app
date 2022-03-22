import handler from '@shared/handler';

const test = handler(async (req, res, next) => {
  res.send('okey')
});

const store = handler(async (req, res, next) => {
  res.send('okey store')
});


export default {
  test,
  store
};
