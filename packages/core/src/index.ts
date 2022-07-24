import { getStoreClass } from './store.class';
import { ReturnStoreType, StateConstraint, StoreConfig } from './types';

export const createStore = <T extends StateConstraint>(
	initialState: T,
	config?: StoreConfig
): ReturnStoreType<T> => {
	const Store = getStoreClass<T>();
	return new Store(initialState, config) as unknown as ReturnStoreType<T>;
};

export * from './devtools';
export * from './store.class';
export * from './types';
