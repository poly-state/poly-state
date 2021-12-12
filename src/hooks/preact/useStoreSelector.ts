import { useEffect, useRef, useState } from 'preact/hooks';
import { ReturnStoreType, StateConstraint } from '../../types';

export const useStoreSelector = <T extends StateConstraint, U extends keyof T>(
	store: ReturnStoreType<T>,
	key: U
): T[U] => {
	const [state, setState] = useState(store.getState()[key]);

	const subscriberRef = useRef<() => void>();

	useEffect(() => {
		//clean up previous listeners if dependencies change
		if (subscriberRef.current) {
			subscriberRef.current();
		}

		subscriberRef.current = store.subscribeKey(key, setState);

		return () => {
			if (subscriberRef?.current) {
				subscriberRef.current();
			}
		};
	}, [store, key]);

	return state;
};
