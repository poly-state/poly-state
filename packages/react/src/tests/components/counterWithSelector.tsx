import { counterStore, useCounterSelector } from '../stores/counter.store';

export const CounterWithSelector = () => {
	const count = useCounterSelector((state) => state.count);

	return (
		<div>
			<h1>count is {count}</h1>
			<button onClick={() => counterStore.setCount((c) => c + 1)}>increment</button>
			<button onClick={() => counterStore.setCount((c) => c - 1)}>decrement</button>
		</div>
	);
};
