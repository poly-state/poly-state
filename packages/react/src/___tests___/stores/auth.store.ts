import { createStore } from '@poly-state/core';
import { useStore } from '../../useStore';
import { createStoreSelector } from '../../useStoreSelector';

const initialState: State = {
	accessToken: '',
	refreshToken: '',
	isLoggedIn: false,
	userInfo: {
		id: '',
		name: '',
		email: '',
	},
};

type State = {
	accessToken: string;
	refreshToken: string;
	isLoggedIn: boolean;
	userInfo: {
		id: string;
		name: string;
		email: string;
	};
};

export const authStore = createStore(initialState);

export const useAuthStoreSelector = createStoreSelector(authStore);
export const useAuthStore = () => useStore(authStore);
