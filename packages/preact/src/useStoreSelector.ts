import { ReturnStoreType, StateConstraint } from '@poly-state/poly-state';
import { useEffect, useRef, useState } from 'preact/compat';

export const useStoreSelector = <T extends StateConstraint, U extends keyof T>(
	store: ReturnStoreType<T>,
	key: U
): T extends StateConstraint ? T[U] : never => {
	const [state, setState] = useState(store.getState()[key]);
	const subscriberRef = useRef<() => void>();

	useEffect(() => {
		//clean up previous listener if dependencies change
		subscriberRef.current?.();
		subscriberRef.current = store.subscribeKey(key as keyof T, (v) => setState(v as T[U]));
	}, [store, key]);

	useEffect(() => () => subscriberRef.current?.(), []);

	return state;
};
