import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import Home from '../components/Homepage';

const mockStore = configureMockStore();

describe('Home', () => {
  it('renders without crashing', () => {
    const store = mockStore({
      countries: [
        {
          countryName: 'Country1',
          region: 'Asia',
          flag: { svg: 'path/to/svg1' },
        },
        {
          countryName: 'Country2',
          region: 'Asia',
          flag: { svg: 'path/to/svg2' },
        },
      ],
      isLoading: false,
      continent: 'Asia',
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Country1/i)).toBeInTheDocument();
  });

  it('renders countries correctly based on the continent filter', () => {
    const store = mockStore({
      countries: [
        {
          countryName: 'Country1',
          region: 'Asia',
          flag: { svg: 'path/to/svg1' },
        },
        {
          countryName: 'Country2',
          region: 'Asia',
          flag: { svg: 'path/to/svg2' },
        },
      ],
      isLoading: false,
      continent: 'Asia',
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Country1/i)).toBeInTheDocument();
    expect(screen.getByText(/Country2/i)).toBeInTheDocument();
  });
});
