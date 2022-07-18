import { createStore } from '@poly-state/poly-state';
import { useStore } from '../../useStore';
import { createStoreSelector } from '../../useStoreSelector';

export const counterStore = createStore({ count: 0 });

export const useCounterSelector = createStoreSelector(counterStore);
export const useCounterStore = () => useStore(counterStore);
