import { computed, createStore, withDevTools } from '@poly-state/core';
import { createStoreSelector, useStore } from '@poly-state/react';

type CounterStore = {
	count: number;
	text: string;
};

const counterStoreInitialState: CounterStore = {
	count: 1,
	text: 'shojib',
};

export const counterStore = createStore(counterStoreInitialState);

withDevTools(counterStore, 'COUNTER_STORE');

export const useCounterStoreSelector = createStoreSelector(counterStore);
export const useCounterStore = () => useStore(counterStore);

export const doubled = computed(counterStore, state => state.count * 2);
export const useDoubledSelector = createStoreSelector(doubled);

export const addText = computed(doubled, state => {
	return `The doubled value is ${state}`;
});

export const useAddTextSelector = createStoreSelector(addText);
