export default {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  // ... add other HTTP methods if needed
};
