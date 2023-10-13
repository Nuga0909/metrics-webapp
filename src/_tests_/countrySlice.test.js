import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { countriesFetch } from '../redux/countrySlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      isLoading: false,
      countries: [],
      continent: 'Asia',
      country: [],
    });
    axios.get.mockClear();
  });

  it('creates countriesFetch.fulfilled when fetching countries succeeds', async () => {
    const mockData = [
      {
        name: 'Country1', // The structure is corrected here
        flags: 'Flag1',
        population: 123456,
        region: 'Region1',
      },
    ];
    axios.get.mockResolvedValueOnce({ data: mockData });

    await store.dispatch(countriesFetch());

    const actions = store.getActions();
    expect(actions[0].type).toEqual(countriesFetch.pending.type);
    expect(actions[1].type).toEqual(countriesFetch.fulfilled.type);
    expect(actions[1].payload).toEqual([
      {
        countryName: 'Country1',
        flag: 'Flag1',
        population: 123456,
        region: 'Region1',
      },
    ]);
  });

  // You can add more tests for other actions and scenarios
});
