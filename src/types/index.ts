export type SetStateFunction<T> = (value: Readonly<T> | ((oldValue: Readonly<T>) => T)) => void;
export type SetStateFunctionArguments<T> = Readonly<T> | ((val: Readonly<T>) => T);

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
export type StateConstraint = Record<
	string,
	SerializablePrimitives | SerializableObject | SerialiableArray
>;

export type CallBack<T> = (value: T) => void;
export type SubscriberCallBacks<T> = {
	[Key in keyof T]: CallBack<T[Key]>;
}[keyof T];

export interface StoreType<T> {
	hydrate: SetStateFunction<T>;
	setState: SetStateFunction<T>;
	subscribe(callback: CallBack<Readonly<T>>): () => void;
	subscribeKey<Key extends keyof T>(key: Key, callback: CallBack<Readonly<T[Key]>>): () => void;
	getState(): Readonly<T>;
}

export type ReturnStoreType<T extends StateConstraint> = StoreType<T> & GeneratedSetters<T>;
