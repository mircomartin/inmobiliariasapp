import { types } from '../types/types';

export const showError = (msg) => ({
	type: types.showError,
	payload: msg,
});

export const removeError = () => ({
	type: types.removeError,
});

export const startLoading = () => ({
	type: types.startLoading,
});

export const finishLoading = () => ({
	type: types.finishLoading,
});
