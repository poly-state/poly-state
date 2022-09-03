import { AllSettersMiddleware, createStore, GeneratedActions, GenericMiddleware } from '..';

describe('Poly State Middleware', () => {
	const initialState = { count: 0 };

	type State = typeof initialState;

	it('should call middleware function with appropriate values when using ALL_SETTERS middleware', () => {
		const myStore = createStore(initialState);

		const middleware: AllSettersMiddleware<State>['middleware'] = (payload) => payload;

		const mockFN = jest.fn(middleware);

		myStore.use({
			type: 'ALL_SETTERS',
			middleware: mockFN,
		});

		myStore.setCount(1);

		expect(mockFN).toBeCalledTimes(1);
		expect(mockFN).toBeCalledWith({ count: 1 }, { count: 0 }, 'setCount');
	});

	it('should call middleware function with appropriate values when using HYDRATE middleware', () => {
		const myStore = createStore(initialState);

		const middleware: GenericMiddleware<State, 'HYDRATE'>['middleware'] = (payload) => payload;

		const mockFN = jest.fn(middleware);

		myStore.use({
			type: 'HYDRATE',
			middleware: mockFN,
		});

		myStore.hydrate({ count: 1 });

		expect(mockFN).toBeCalledTimes(1);
		expect(mockFN).toBeCalledWith({ count: 1 }, { count: 0 });
	});

	it('should call middleware function with appropriate values when using SET_STATE middleware', () => {
		const myStore = createStore(initialState);

		const middleware: GenericMiddleware<State, 'SET_STATE'>['middleware'] = (payload) => payload;

		const mockFN = jest.fn(middleware);

		myStore.use({
			type: 'SET_STATE',
			middleware: mockFN,
		});

		myStore.setState({ count: 1 });

		expect(mockFN).toBeCalledTimes(1);
		expect(mockFN).toBeCalledWith({ count: 1 }, { count: 0 });
	});

	it('should call middleware function with appropriate values when using specific setter middleware', () => {
		const myStore = createStore(initialState);

		const middleware: GeneratedActions<State>['middleware'] = (payload) => payload;

		const mockFN = jest.fn(middleware);

		myStore.use({
			type: 'setCount',
			middleware: mockFN,
		});

		myStore.setCount(1);

		expect(mockFN).toBeCalledTimes(1);
		expect(mockFN).toBeCalledWith(1, 0);
	});
});
