import { GenericStore } from '@poly-state/core';
import { useSyncExternalStore } from 'react';

export const useStoreSelector = <State, ReturnValue>(
	store: GenericStore<State>,
	fn: (store: State) => ReturnValue
) => {
	const state = useSyncExternalStore(
		(v) => store.subscribe(v),
		() => fn(store.getState())
	);

	return state;
};

export const createStoreSelector = <State>(store: GenericStore<State>) => {
	return <ReturnValue>(fn: (store: State) => ReturnValue) => useStoreSelector(store, fn);
};
