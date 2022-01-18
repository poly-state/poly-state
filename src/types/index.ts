import { DeepReadonly } from 'ts-essentials';

export type SetStateFunction<T> = (value: T | ((oldValue: DeepReadonly<T>) => T)) => void;
export type SubscribeFunction<T> = (
	callback: (newValue: DeepReadonly<T>) => void
) => UnsubscribeFunction;

export type KeySubscriberFunction<T extends StateConstraint, StoreKeys extends keyof T> = (
	key: StoreKeys,
	callback: SubscribeFunction<T[StoreKeys]>
) => UnsubscribeFunction;

export type UnsubscribeFunction = () => void;

export type GeneratedSetters<T> = {
	[Key in keyof T as `set${Capitalize<string & Key>}`]: SetStateFunction<T[Key]>;
};

export type SerializablePrimitives = string | number | boolean | null | undefined;
export type SerializableObject = Record<
	string,
	| SerializablePrimitives
	| SerialiableArray
	| Record<string, SerializablePrimitives | SerialiableArray>
>;
export type SerialiableArray =
	| Array<SerializablePrimitives>
	| Array<SerializableObject>
	| Array<SerialiableArray>;

export type StateConstraintTest = Record<
	string,
	SerializablePrimitives | SerializableObject | SerialiableArray
>;

export type StateConstraint = Record<string, any>;

export type CallBack<T> = (value: DeepReadonly<T>) => void;
export type SubscriberCallBacks<T extends StateConstraint> = {
	[Key in keyof T]: Array<CallBack<T[Key]>>;
};

export type StoreType<T> = {
	hydrate: SetStateFunction<T>;
	setState: SetStateFunction<T>;
	subscribe: SubscribeFunction<T>;
	subscribeKey: KeySubscriberFunction<T, keyof T>;
	getState(): DeepReadonly<T>;
};

export type ReturnStoreType<T extends StateConstraint> = StoreType<T> & GeneratedSetters<T>;
