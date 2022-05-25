const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/__tests__/setup.ts'],
  testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
  clearMocks: true,
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper:pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' } ) //todo ?

  //todo: alias ? tsconfig'de var ?
};
