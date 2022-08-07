import { useRef } from 'react';
import { reRenderStore, useReRenderSelector } from '../stores/re-render.store';

const Component1 = () => {
	const count = useReRenderSelector((s) => s.component_1);

	const reRenderCount = useRef(0);
	reRenderCount.current = reRenderCount.current + 1;

	return (
		<div id='component_1'>
			count is {count}count is {count} <h1>{reRenderCount.current}</h1>
		</div>
	);
};

const Component2 = () => {
	const count = useReRenderSelector((s) => s.component_2);

	const reRenderCount = useRef(0);
	reRenderCount.current = reRenderCount.current + 1;

	return (
		<div id='component_2'>
			count is {count} <h1>{reRenderCount.current}</h1>
		</div>
	);
};

export const RerenderTester = () => {
	const incrementComponent1 = () => reRenderStore.setComponent_1((v) => v + 1);
	const incrementComponent2 = () => reRenderStore.setComponent_2((v) => v + 1);

	return (
		<>
			<Component1 />
			<Component2 />
			<button id='increment_1' onClick={incrementComponent1}>
				increment component 1
			</button>
			<button id='increment_2' onClick={incrementComponent2}>
				increment component 2
			</button>
		</>
	);
};
