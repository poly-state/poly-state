import { ReturnStoreType, StateConstraint } from '@poly-state/core';
import { useSyncExternalStore } from 'use-sync-external-store';

export const useStore = <T extends StateConstraint>(store: ReturnStoreType<T>) => {
	const state = useSyncExternalStore(
		(cb) => {
			return store.subscribe(cb);
		},
		() => store.getState()
	);

	return state;
};
