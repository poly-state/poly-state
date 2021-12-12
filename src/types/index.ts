export type SetStateDef<T> = (value: T | ((oldValue: T) => T)) => void;

export type SetTypeArg<T> = T | ((val: T) => T);

export type SetterType<T> = {
	[Key in keyof T as `set${Capitalize<string & Key>}`]: SetStateDef<T[Key]>;
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
	hydrate: SetStateDef<T>;
	setState: SetStateDef<T>;
	subscribe(callback: CallBack<T>): () => void;
	subscribeKey<Key extends keyof T>(key: Key, callback: CallBack<T[Key]>): () => void;
	getState(): T;
}

export type ReturnStoreType<T extends StateConstraint> = StoreType<T> & SetterType<T>;
