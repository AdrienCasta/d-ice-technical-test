import { pathsToModuleNameMapper } from 'ts-jest';

const paths = {
  '@domain/*': ['src/domain/*'],
  '@application/*': ['src/application/*'],
  '@infra/*': ['src/infra/*'],
};

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>/' }),
};
