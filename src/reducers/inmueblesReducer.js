import { types } from '../types/types';

const initialState = {
	inmuebles: [],
	active: {},
};

export const inmueblesReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.addInmueble:
			return {
				...state,
				inmuebles: [...state.inmuebles, action.payload],
			};
		case types.listInmuebles:
			return {
				...state,
				inmuebles: action.payload,
				active: {},
			};
		case types.activeInmueble:
			return {
				...state,
				active: action.payload,
			};
		case types.deletedInmueble:
			return {
				...state,
				inmuebles: state.inmuebles.filter(
					(inmueble) => inmueble.id !== action.payload,
				),
				active: {},
			};
		case types.updatedInmueble:
			return {
				...state,
				inmuebles: state.inmuebles.map(
					(inmueble) => inmueble.id === action.payload.id
					? action.payload
					: inmueble
				),
				active: {},
			};
		default:
			return state;
	}
};
