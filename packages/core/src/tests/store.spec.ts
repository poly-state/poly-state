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

	it('should not notify listeners if the state has not changed', () => {
		const myStore = createStore({ count: 0 });

		const listener = jest.fn();
		myStore.subscribe(listener);

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

	it('should send the correct value if the updater is a function when updating a key', () => {
		const myStore = createStore({
			count: [{ test: 1 }, { test: 2 }, { test: 3 }],
		});
		myStore.setCount((oldVal) => {
			expect(oldVal).toEqual([{ test: 1 }, { test: 2 }, { test: 3 }]);
			return oldVal;
		});
	});

	it('should hydrate store and should not notify any subscribers', () => {
		const myStore = createStore({
			count: [{ test: 1 }, { test: 2 }, { test: 3 }],
		});
		const mySubscriber = jest.fn();

		myStore.subscribe(mySubscriber);

		myStore.hydrate({ count: [{ test: 2 }, { test: 3 }, { test: 4 }] });

		expect(mySubscriber).not.toHaveBeenCalled();
		expect(myStore.getState().count).toEqual([{ test: 2 }, { test: 3 }, { test: 4 }]);
	});

	// eslint-disable-next-line quotes
	it("should hydrate store only once in it's lifetime", () => {
		const myStore = createStore({
			count: [{ test: 1 }, { test: 2 }, { test: 3 }],
		});
		const mySubscriber = jest.fn();

		myStore.subscribe(mySubscriber);

		myStore.hydrate({ count: [{ test: 2 }, { test: 3 }, { test: 4 }] });
		myStore.hydrate({ count: [{ test: 3 }, { test: 4 }, { test: 5 }] });

		expect(mySubscriber).not.toHaveBeenCalled();
		expect(myStore.getState().count).toEqual([{ test: 2 }, { test: 3 }, { test: 4 }]);
	});
});
