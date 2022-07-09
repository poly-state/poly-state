import { ReturnStoreType, StateConstraint } from '@poly-state/poly-state';
import { useEffect, useState } from 'preact/compat';

export const useStore = <T extends StateConstraint>(store: ReturnStoreType<T>) => {
	const [state, setState] = useState(store.getState());
	useEffect(() => store.subscribe(setState), [store]);
	return state;
};
