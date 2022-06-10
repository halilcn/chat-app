import { faker } from '@faker-js/faker';

import helpers from '@/helpers';

describe('Helpers', function () {
  describe('convertToFullBackendPath function', function () {
    it('should return correct full backend path', () => {
      const fakeUrl = faker.internet.url();
      const expectedUrl = process.env.VUE_APP_BACKEND_URL + fakeUrl;

      expect(helpers.convertToFullBackendPath(fakeUrl)).toEqual(expectedUrl);
    });
  });
});
