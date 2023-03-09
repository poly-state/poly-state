import { memo } from 'react';
import './App.css';
import { counterStore, useAddTextSelector, useCounterStoreSelector, useDoubledSelector } from './counter/counterStore';
import logo from './logo.svg';

const TextInput = memo(() => {
	const text = useCounterStoreSelector(s => s.text);

	return (
		<div>
			<input type='text' value={text} onChange={e => counterStore.setText(e.target.value)} />
		</div>
	);
});

const Text = memo(() => {
	const text = useCounterStoreSelector(s => s.text);

	return <div>{text}</div>;
});

const CounterButton = memo(() => {
	return (
		<div>
			<button
				type='button'
				onClick={() =>
					counterStore.setCount(c => {
						return c + 1;
					})
				}
			>
				increment
			</button>
		</div>
	);
});

const CounterDisplay = memo(() => {
	const count = useCounterStoreSelector(s => s.count);
	return <div>{count}</div>;
});

const DoubledCountDisplay = memo(() => {
	const count = useDoubledSelector(s => s);
	return <div>{count}</div>;
});

const WithText = memo(() => {
	const text = useAddTextSelector(s => s);

	return <div>{text}</div>;
});

function App() {
	const storeValue = useCounterStoreSelector(s => s);

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>Hello Vite + React!</p>

				<pre>{JSON.stringify(storeValue, null, 2)}</pre>

				<div>
					<CounterButton />
					<CounterDisplay />
					<DoubledCountDisplay />
					<WithText />
					<Text></Text>
					<TextInput></TextInput>
				</div>
			</header>
		</div>
	);
}

export default App;
