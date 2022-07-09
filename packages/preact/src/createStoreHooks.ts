import { ReturnStoreType, StateConstraint } from '@poly-state/poly-state';
import { useStore } from './index';
import { useStoreSelector } from './useStoreSelector';

type UseStoreSelectorHook<T extends StateConstraint> = <U extends keyof T>(
	key: U
) => U extends keyof T ? T[U] : never;

type UseStoreHook<T extends StateConstraint> = () => T;

export const createStoreHooks = <T extends StateConstraint>(
	store: ReturnStoreType<T>
): [UseStoreHook<T>, UseStoreSelectorHook<T>] => {
	return [() => useStore(store), (key: keyof T) => useStoreSelector(store, key)];
};
