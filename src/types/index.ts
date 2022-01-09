import { DeepReadonly } from 'ts-essentials';

export type SetStateFunction<T> = (value: T | ((oldValue: DeepReadonly<T>) => T)) => void;
export type SetStateFunctionArguments<T> = T | ((val: DeepReadonly<T>) => T);

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
	subscribe(callback: CallBack<T>): () => void;
	subscribeKey<Key extends keyof T>(
		key: Key,
		callback: Key extends keyof T ? CallBack<T[Key]> : never
	): () => void;
	getState(): Readonly<T>;
};

export type ReturnStoreType<T extends StateConstraint> = StoreType<T> & GeneratedSetters<T>;
