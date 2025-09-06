export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: '../../',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(svg|png|jpg|jpeg|gif)$': '<rootDir>/config/jest/fileMock.tsx',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '\\.e2e\\.(ts|tsx)$'],
  clearMocks: true,
}
