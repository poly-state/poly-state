import { useEffect, useState } from 'react';
import { ReturnStoreType, StateConstraint } from '../../types';

export const useStore = <T extends StateConstraint>(store: ReturnStoreType<T>) => {
	const [state, setState] = useState(store.getState());
	useEffect(() => store.subscribe(setState), [store]);
	return state;
};
