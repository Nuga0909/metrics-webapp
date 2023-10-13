import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import mockAxios from 'jest-mock-axios';
import countrySlice, {
  countriesFetch,
  countryFetch,
} from './path-to-your-code-file';

describe('async thunk actions', () => {
  let store;

  beforeEach(() => {
    // Set up a mock store for the tests
    store = createStore(countrySlice, applyMiddleware(thunk));
  });

  afterEach(() => {
    // Cleaning up: remove all axios mocks
    mockAxios.reset();
  });

  it('creates countriesFetch.fulfilled when fetching countries succeeds', async () => {
    // Dispatch the async action
    store.dispatch(countriesFetch());

    // Simulate a successful response
    const responseMock = [{ name: 'Country1' }, { name: 'Country2' }];
    mockAxios.mockResponse({ data: responseMock });

    const expectedActions = [
      { type: countriesFetch.pending.type },
      { type: countriesFetch.fulfilled.type, payload: responseMock },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates countriesFetch.rejected when fetching countries fails', async () => {
    store.dispatch(countriesFetch());

    // Simulate an error response
    mockAxios.mockError(new Error('An error occurred!'));

    const expectedActions = [
      { type: countriesFetch.pending.type },
      {
        type: countriesFetch.rejected.type,
        error: new Error('An error occurred!'),
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates countryFetch.fulfilled when fetching a single country succeeds', async () => {
    store.dispatch(countryFetch('countryName'));

    const responseMock = [{ name: 'Country1' }];
    mockAxios.mockResponse({ data: responseMock });

    const expectedActions = [
      { type: countryFetch.pending.type },
      { type: countryFetch.fulfilled.type, payload: responseMock },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  // Similarly, you can test for countryFetch.rejected
});
