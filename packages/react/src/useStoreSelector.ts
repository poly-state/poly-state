import { ReturnStoreType, StateConstraint, shallowCompare } from '@poly-state/core';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js';

export const useStoreSelector = <T extends StateConstraint, U = T>(
	store: ReturnStoreType<T>,
	fn: (store: T) => U = (v) => v as any
) => {
	const state = useSyncExternalStoreWithSelector(
		(cb) => store.subscribe(cb),
		() => store.getState(),
		null,
		fn,
		shallowCompare
	);

	return state;
};

export const createStoreSelector = <T extends StateConstraint>(store: ReturnStoreType<T>) => {
	return <U>(fn: (store: T) => U) => useStoreSelector(store, fn);
};
