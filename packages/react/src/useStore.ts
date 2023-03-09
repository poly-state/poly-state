import { GenericStore } from '@poly-state/core';
import { useSyncExternalStore } from 'react';

export const useStore = <State>(store: GenericStore<State>) => {
	const state = useSyncExternalStore(
		(v) => store.subscribe(v),
		() => store.getState()
	);

	return state;
};
