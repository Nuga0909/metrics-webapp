/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import countrySlice from './countrySlice';

const store = configureStore({ reducer: countrySlice });

export default store;
