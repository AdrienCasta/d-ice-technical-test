const { pathsToModuleNameMapper } = require('ts-jest');

const paths = {
  '@domain/*': ['src/domain/*'],
  '@application/*': ['src/application/*'],
  '@infra/*': ['src/infra/*'],
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>/' }),
};
