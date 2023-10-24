import { createStore, transact } from '..';

describe('Poly Stat Transact functionality', () => {
	it('should perform batch updates', () => {
		const store = createStore({ count: 0, name: 'test', other: {} });

		const listener = jest.fn();

		store.subscribe(listener);

		transact(() => {
			store.setCount(1);
			store.setName('test2');
			store.setOther({ test: true });
		});

		expect(listener).toBeCalledTimes(1);
		expect(listener).toHaveBeenCalledWith({ count: 1, name: 'test2', other: { test: true } });
	});

	it('should perform batched updates across multiple stores', () => {
		const store1 = createStore({ count: 0, name: 'test' });
		const store2 = createStore({ count: 0, name: 'test' });

		const listener1 = jest.fn();
		const listener2 = jest.fn();

		store1.subscribe(listener1);
		store2.subscribe(listener2);

		transact(() => {
			store1.setCount(1);
			store1.setName('test2');

			store2.setCount(1);
			store2.setName('test2');
		});

		expect(listener1).toBeCalledTimes(1);
		expect(listener1).toHaveBeenCalledWith({ count: 1, name: 'test2' });

		expect(listener2).toBeCalledTimes(1);
		expect(listener2).toHaveBeenCalledWith({ count: 1, name: 'test2' });
	});
});
