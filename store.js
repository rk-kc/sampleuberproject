// A sample code to create a store for the app - can be found in the redux documentation.

import { configureStore } from '@reduxjs/toolkit';
import navReducer from './slices/navSlice';

export const store = configureStore({
	reducer: {
		nav: navReducer,
	},
});
