import '@testing-library/jest-dom';
import * as tester from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Counter } from '../components/counter';
test('Simple Counter Test', () => {
	const { container } = tester.render(<Counter />);
	const h1 = container.querySelector('h1');
	expect(h1).toBeInTheDocument();

	const [incrementButton, decrementButton] = container.querySelectorAll('button');

	expect(incrementButton).toBeInTheDocument();
	expect(decrementButton).toBeInTheDocument();

	expect(h1).toHaveTextContent('count is 0');

	act(() => incrementButton.click());
	expect(h1).toHaveTextContent('count is 1');

	act(() => decrementButton.click());
	expect(h1).toHaveTextContent('count is 0');

	for (let i = 0; i < 10; i++) {
		act(() => incrementButton.click());
	}

	expect(h1).toHaveTextContent('count is 10');

	for (let i = 0; i < 10; i++) {
		act(() => decrementButton.click());
	}

	expect(h1).toHaveTextContent('count is 0');
});
