import io from 'socket.io-client';
import testConfig from '../../test-utils/test-config';

export default () => {
  return io(testConfig.API_URL, { transports: ['websocket'] });
};
