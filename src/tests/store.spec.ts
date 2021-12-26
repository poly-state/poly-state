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
});
