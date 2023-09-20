import { createSlice } from '@reduxjs/toolkit';

// The initial state of the data layer
const initialState = {
	origin: null,
	destination: null,
	travelTimeInformation: null,
};

// Next step is to create a slice for the navigation reducer
// A slice is a piece of the reducer
export const navSlice = createSlice({
	name: 'nav',
	initialState,
	// The reducers are the actions that we can dispatch to the data layer
	reducers: {
		setOrigin: (state, action) => {
			state.origin = action.payload;
		},
		setDestination: (state, action) => {
			state.destination = action.payload;
		},
		setTravelTimeInformation: (state, action) => {
			state.travelTimeInformation = action.payload;
		},
	},
});

// pushing data to the data layer = Actions
export const { setOrigin, setDestination, setTravelTimeInformation } =
	navSlice.actions;

// pulling data from the data layer = Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
	state.nav.travelTimeInformation;

export default navSlice.reducer;
