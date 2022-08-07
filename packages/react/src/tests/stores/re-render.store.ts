import { createStore } from '@poly-state/core';
import { useStore } from '../../useStore';
import { createStoreSelector } from '../../useStoreSelector';

export const reRenderStore = createStore({
	component_1: 0,
	component_2: 0,
});

export const useReRenderSelector = createStoreSelector(reRenderStore);
export const useReRenderStore = () => useStore(reRenderStore);
