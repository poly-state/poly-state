import { getStoreClass } from './store.class';
import { ReturnStoreType, StateConstraint } from './types';

export const createStore = <T extends StateConstraint>(initialState: T): ReturnStoreType<T> => {
	const Store = getStoreClass<T>();
	return new Store(initialState) as unknown as ReturnStoreType<T>;
};

export * from './store.class';
export * from './types';
