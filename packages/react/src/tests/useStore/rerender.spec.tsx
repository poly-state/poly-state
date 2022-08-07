import '@testing-library/jest-dom';
import * as tester from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { RerenderTester } from '../components/reRenderComponent';
test('Simple Counter Test', () => {
	const { container } = tester.render(<RerenderTester />);

	const [increment_1, increment_2] = container.querySelectorAll('button');

	const [count_1, count_2] = container.querySelectorAll('div');

	const [reRenderCount_1, reRenderCount_2] = container.querySelectorAll('h1');

	expect(increment_1).toBeInTheDocument();
	expect(increment_2).toBeInTheDocument();

	expect(count_1).toHaveTextContent('count is 0');

	act(() => increment_1.click());
	expect(count_1).toHaveTextContent('count is 1');

	expect(count_2).toHaveTextContent('count is 0');
	expect(reRenderCount_1).toHaveTextContent('2');
	expect(reRenderCount_2).toHaveTextContent('1');

	act(() => increment_2.click());
	expect(count_2).toHaveTextContent('count is 1');
	expect(reRenderCount_1).toHaveTextContent('2');
	expect(reRenderCount_2).toHaveTextContent('2');
});
