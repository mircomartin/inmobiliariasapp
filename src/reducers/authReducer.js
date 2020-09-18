import { types } from '../types/types'

const initialState = {
    user: {},
    logged: false,
	profile: {},
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
		case types.login:
			return {
				user: action.payload,
				logged: true
			}
		case types.logout:
			return {
				initialState
			}
		case types.profileActive:
			return {
				...state,
				profile: action.payload,
			}
		default:
			return state;
	}
}
