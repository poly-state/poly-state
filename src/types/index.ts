export type SetStateArgs<T extends StateConstraint> = T | ((oldValue: T) => T);
export type SetStateFunction<T> = (value: T | ((oldValue: T) => T)) => void;
export type SubscribeFunction<T> = (callback: CallBack<T>) => UnsubscribeFunction;
export type UnsubscribeFunction = () => void;

export type KeySubscriberFunction<T extends StateConstraint, StoreKeys extends keyof T> = (
	key: StoreKeys,
	callback: SubscribeFunction<T[StoreKeys]>
) => UnsubscribeFunction;

export type GeneratedSetters<T extends StateConstraint> = {
	[Key in keyof T as `set${Capitalize<string & Key>}`]: SetStateFunction<T[Key]>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StateConstraint = Record<string, any>;

export type CallBack<T> = (value: T) => void;
export type SubscriberCallBacks<T extends StateConstraint> = {
	[Key in keyof T]: Array<CallBack<T[Key]>>;
};

export type StoreType<State extends StateConstraint> = {
	hydrate(valueORcallback: SetStateArgs<State>): void;
	setState(valueORcallback: SetStateArgs<State>): void;
	subscribe(callback: CallBack<State>): UnsubscribeFunction;
	subscribeKey<Key extends keyof State>(
		key: Key,
		callback: KeySubscriberFunction<State, Key>
	): UnsubscribeFunction;
	getState(): State;
	use(middleware: StoreMiddleWareFunction<State>): ReturnStoreType<State>;
};

export type ReturnStoreType<T extends StateConstraint> = StoreType<T> & GeneratedSetters<T>;

export type EqualityComparatorFunction = (a: unknown, b: unknown) => boolean;

export type StoreConfig = {
	/**
	 * Custom Equality comparator function
	 * @default none
	 */
	equalityComparator?: EqualityComparatorFunction;
};

export type GeneratedActions<T extends StateConstraint> = {
	[Key in keyof T]: {
		type: `set${Capitalize<string & Key>}`;
		middleware: (payload: T[Key], previousState: T[Key]) => T[Key];
	};
}[keyof T];

export type StoreMiddleWareFunction<T extends StateConstraint> =
	| GeneratedActions<T>
	| { type: 'SET_STATE'; middleware: (payload: T, previousState: T) => T }
	| { type: 'HYDRATE'; middleware: (payload: T, previousState: T) => T }
	| {
			type: 'ALL_SETTERS';
			middleware: (payload: T, previousState: T, type: string) => T;
	  };
