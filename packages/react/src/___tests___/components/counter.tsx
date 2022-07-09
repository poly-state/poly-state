import { FC } from 'react';
import { counterStore, useCounterStore } from '../stores/counter.store';

export const Counter: FC = () => {
	const { count } = useCounterStore();

	return (
		<div>
			<h1>count is {count}</h1>
			<button onClick={() => counterStore.setCount((c) => c + 1)}>increment</button>
			<button onClick={() => counterStore.setCount((c) => c - 1)}>decrement</button>
		</div>
	);
};
