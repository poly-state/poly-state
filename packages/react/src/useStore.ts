import { ReturnStoreType, StateConstraint } from '@poly-state/poly-state';
import { useEffect, useState } from 'react';

export const useStore = <T extends StateConstraint>(store: ReturnStoreType<T>) => {
	const [state, setState] = useState(() => store.getState());

	useEffect(() => {
		const unsub = store.subscribe((v) => setState(v));
		return () => unsub();
	}, [store]);

	return state;
};
