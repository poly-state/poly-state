import { ReturnStoreType, StateConstraint } from '@poly-state/core';
import { useEffect, useRef, useState } from 'preact/compat';

export const useStoreSelector = <T extends StateConstraint, U>(
	store: ReturnStoreType<T>,
	fn: (store: T) => U
) => {
	const subscriberRef = useRef<() => void>();
	const fnRef = useRef(fn);
	const [state, setState] = useState(() => fnRef.current(store.getState()));

	useEffect(() => {
		fnRef.current = fn;
	}, [fn]);

	useEffect(() => {
		//clean up previous listener if dependencies change
		subscriberRef.current?.();
		subscriberRef.current = store.subscribe((v) => setState(fnRef.current(v)));

		return () => subscriberRef.current?.();
	}, [store]);

	return state;
};

export const createStoreSelector = <T extends StateConstraint>(store: ReturnStoreType<T>) => {
	return <U>(fn: (store: T) => U) => useStoreSelector(store, fn);
};
