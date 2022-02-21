export type SetStateFunction<T> = (value: T | ((oldValue: T) => T)) => void;
export type SubscribeFunction<T> = (callback: (newValue: T) => void) => UnsubscribeFunction;
export type UnsubscribeFunction = () => void;

export type KeySubscriberFunction<T extends StateConstraint, StoreKeys extends keyof T> = (
	key: StoreKeys,
	callback: SubscribeFunction<T[StoreKeys]>
) => UnsubscribeFunction;

export type GeneratedSetters<T> = {
	[Key in keyof T as `set${Capitalize<string & Key>}`]: SetStateFunction<T[Key]>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StateConstraint = Record<string, any>;

export type CallBack<T> = (value: T) => void;
export type SubscriberCallBacks<T extends StateConstraint> = {
	[Key in keyof T]: Array<CallBack<T[Key]>>;
};

export type StoreType<T> = {
	hydrate: SetStateFunction<T>;
	setState: SetStateFunction<T>;
	subscribe: SubscribeFunction<T>;
	subscribeKey: KeySubscriberFunction<T, keyof T>;
	getState(): T;
};

export type ReturnStoreType<T extends StateConstraint> = StoreType<T> & GeneratedSetters<T>;

export type EqualityComparatorFunction = (a: unknown, b: unknown) => boolean;

export type StoreConfig = {
	/**
	 * Enable redux devtools integration
	 * @default false
	 */
	enableDevTools?: boolean;

	/**
	 * Custom Equality comparator function
	 * @default none
	 */
	equalityComparator?: EqualityComparatorFunction;

	/**
	 * Used to identify inside redux devtools
	 */
	storeIdentifier?: string;
};
