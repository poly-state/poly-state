import { createStore } from '@poly-state/poly-state';
import { createStoreSelector, useStore } from '@poly-state/preact';
type CounterStore = {
	count: number;
};

const counterStoreInitialState: CounterStore = {
	count: 1,
};

export const counterStore = createStore(counterStoreInitialState);

// withDevTools(counterStore, 'COUNTER_STORE');

export const useCounterStoreSelector = createStoreSelector(counterStore);
export const useCounterStore = () => useStore(counterStore);
