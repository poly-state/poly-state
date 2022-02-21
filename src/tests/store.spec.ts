import { createStore } from '..';

describe('Poly State Main functionality', () => {
	it('should update the state using the generated method', () => {
		const myStore = createStore({ count: 0 });

		myStore.setCount(1);

		expect(myStore.getState().count).toBe(1);
	});

	it('should notify listeners with updated value when updated by the generated method', () => {
		const myStore = createStore({ count: 0 });

		const listener = jest.fn();
		myStore.subscribe(listener);

		myStore.setCount(1);

		expect(listener).toHaveBeenCalledWith({ count: 1 });
	});

	it('should notify key listeners with updated value when updated by generated method', () => {
		const myStore = createStore({ count: 0 });

		const listener = jest.fn();
		myStore.subscribeKey('count', listener);

		myStore.setCount(1);

		expect(listener).toHaveBeenCalledWith(1);
	});

	it('should notify all listeners with updated value when updated by generated method', () => {
		const myStore = createStore({ count: 0 });

		const listener = jest.fn();
		myStore.subscribe(listener);

		const keyListener = jest.fn();

		myStore.subscribeKey('count', keyListener);
		myStore.setCount(1);

		expect(listener).toHaveBeenCalledWith({ count: 1 });
		expect(keyListener).toHaveBeenCalledWith(1);
	});

	it('should not notify listeners if the state has not changed', () => {
		const myStore = createStore({ count: 0 });

		const listener = jest.fn();
		myStore.subscribe(listener);

		myStore.setCount(0);

		expect(listener).not.toHaveBeenCalled();
	});

	it('should not notify keyListener if the value has not changed', () => {
		const myStore = createStore({ count: 0 });

		const listener = jest.fn();
		myStore.subscribeKey('count', listener);

		myStore.setCount(0);

		expect(listener).not.toHaveBeenCalled();
	});

	it('should notify multiple listeners at the same time', () => {
		const myStore = createStore({ count: 0 });

		const listener1 = jest.fn();
		const listener2 = jest.fn();
		myStore.subscribe(listener1);
		myStore.subscribe(listener2);

		myStore.setCount(1);

		expect(listener1).toHaveBeenCalledWith({ count: 1 });
		expect(listener2).toHaveBeenCalledWith({ count: 1 });
	});

	it('should notify multiple key listeners at the same time', () => {
		const myStore = createStore({ count: 0 });

		const listener1 = jest.fn();
		const listener2 = jest.fn();
		myStore.subscribeKey('count', listener1);
		myStore.subscribeKey('count', listener2);

		myStore.setCount(1);

		expect(listener1).toHaveBeenCalledWith(1);
		expect(listener2).toHaveBeenCalledWith(1);
	});

	it('it should not call a unsubscribed listener if a state was changed', () => {
		const myStore = createStore({ count: 0 });

		const listener = jest.fn();
		const unsubscribeHandle = myStore.subscribe(listener);

		unsubscribeHandle();

		myStore.setCount(1);

		myStore.setCount((oldval) => {
			oldval += 1;
			return oldval + 1;
		});

		expect(listener).not.toHaveBeenCalled();
	});

	it('it should call key subscriber if the key is an object', () => {
		const myStore = createStore({ count: { test1: 1, test2: 2 } });

		const listener = jest.fn();
		myStore.subscribeKey('count', listener);

		myStore.setCount({ test1: 2, test2: 3 });

		expect(listener).toHaveBeenCalledWith({ test1: 2, test2: 3 });
	});
	it('it should call key subscriber if the key is an array', () => {
		const myStore = createStore({ count: [1, 2, 3] });

		const listener = jest.fn();
		myStore.subscribeKey('count', listener);

		myStore.setCount([4, 5, 6]);

		expect(listener).toHaveBeenCalledWith([4, 5, 6]);
	});

	it('it should call key subscriber if the key is an array of objects', () => {
		const myStore = createStore({ count: [{ test: 1 }, { test: 2 }, { test: 3 }] });

		const listener = jest.fn();
		myStore.subscribeKey('count', listener);

		myStore.setCount([{ test: 2 }, { test: 3 }, { test: 4 }]);

		expect(listener).toHaveBeenCalledWith([{ test: 2 }, { test: 3 }, { test: 4 }]);
	});

	it('should send the correct value if the updater is a function when updating a key', () => {
		const myStore = createStore({ count: [{ test: 1 }, { test: 2 }, { test: 3 }] });
		myStore.setCount((oldVal) => {
			expect(oldVal).toEqual([{ test: 1 }, { test: 2 }, { test: 3 }]);
			return oldVal;
		});
	});
});
