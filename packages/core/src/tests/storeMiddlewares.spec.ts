import { createStore } from '..';

describe('Poly State Middleware', () => {
	const initialState = { count: 0 };

	it('should return the store when the use function is called a type with ALL_SETTERS', () => {
		const myStore = createStore(initialState);
		myStore.use({
			type: 'ALL_SETTERS',
			middleware: (paylod, previousState, action) => {
				expect(previousState).toEqual(initialState);
				expect(paylod).toEqual({ count: 1 });
				expect(action).toEqual('SET_COUNT');
				return { count: 1 };
			},
		});
	});

	it('should return the store when the use function is called a type with HYDRATE', () => {
		const myStore = createStore(initialState);
		myStore.use({
			type: 'HYDRATE',
			middleware: (paylod, previousState) => {
				expect(paylod).toEqual(initialState);
				expect(previousState).toEqual(initialState);
				return { count: 1 };
			},
		});
	});

	it('should return the store when the use function is called a type with SET_STATE', () => {
		const myStore = createStore(initialState);
		myStore.use({
			type: 'SET_STATE',
			middleware: (paylod, previousState) => {
				expect(paylod).toEqual({ count: 1 });
				expect(previousState).toEqual(initialState);
				return { count: 1 };
			},
		});
	});

	it('should return the store when the use function is called a type with a key', () => {
		const myStore = createStore(initialState);
		myStore.use({
			type: 'setCount',
			middleware: (paylod, previousState) => {
				expect(paylod).toEqual(1);
				expect(previousState).toEqual(initialState);
				return 1;
			},
		});
	});
});
