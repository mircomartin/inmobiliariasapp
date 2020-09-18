import { types } from '../types/types';

const initialState = {
	msgError: null,
	loading: false,
};

export const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.showError:
			return {
				...state,
				msgError: action.payload,
			};
		case types.removeError:
			return {
				...state,
				msgError: null,
			};
		case types.startLoading:
			return {
				...state,
				loading: true,
			};
		case types.finishLoading:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};
