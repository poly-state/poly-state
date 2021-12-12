import { createSignal, onCleanup, onMount } from 'solid-js';
import { ReturnStoreType, StateConstraint } from '../../types';

export const useStore = <T extends StateConstraint>(store: ReturnStoreType<T>) => {
	const [state, setState] = createSignal(store.getState());
	let unsubscribe: () => void;

	onMount(() => {
		unsubscribe = store.subscribe((v) => {
			setState(() => v);
		});
	});

	onCleanup(() => {
		unsubscribe();
	});

	return state;
};
