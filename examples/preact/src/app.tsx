import { counterStore, useCounterStoreSelector } from './counter/counterStore';
import { Logo } from './logo';

export function App() {
	const count = useCounterStoreSelector((s) => s.count);

	return (
		<>
			<Logo />
			<p>Hello Vite + Preact!</p>
			<p>
				<a class='link' href='https://preactjs.com/' target='_blank' rel='noopener noreferrer'>
					Learn Preact
				</a>
			</p>
			<button type='button' onClick={() => counterStore.setCount((c) => c + 1)}>
				count is: {count}
			</button>
		</>
	);
}
