import { GenericStore } from './types/store.interface';

export const computed = <State, ComputedValue>(
	store: GenericStore<State>,
	selector: (value: State) => ComputedValue
) => {
	const subscribers = new Set<(value: ComputedValue) => void>();

	let computedValue = selector(store.getState());

	store.subscribe((value) => {
		const newValue = selector(value);

		if (newValue !== computedValue) {
			computedValue = newValue;
			subscribers.forEach((callback) => callback(newValue));
		}
	});

	const computedStore = {
		getState: () => computedValue,
		subscribe: (callback: (value: ComputedValue) => void) => {
			subscribers.add(callback);
			callback(computedValue);

			return () => {
				subscribers.delete(callback);
			};
		},
	};

	return computedStore;
};
