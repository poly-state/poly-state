import { createSignal, onCleanup, onMount } from 'solid-js';
import { ReturnStoreType, StateConstraint } from '../../types';

export const useStoreSelector = <T extends StateConstraint, U extends keyof T>(
	store: ReturnStoreType<T>,
	key: U
): (() => T[U]) => {
	const [state, setState] = createSignal(store.getState()[key]);
	let unsubscribe: () => void;

	onMount(() => {
		unsubscribe = store.subscribeKey(key, (v) => {
			setState(() => v);
		});
	});

	onCleanup(() => {
		unsubscribe();
	});

	return state;
};
