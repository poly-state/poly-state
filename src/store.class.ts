/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEqual } from 'lodash';
import { DeepReadonly } from 'ts-essentials';
import {
	CallBack,
	ReturnStoreType,
	SetStateFunctionArguments,
	StateConstraint,
	StoreType,
	SubscriberCallBacks,
} from './types';
import { capitalize, deleteFromArray } from './utils';

export const getStoreClass = <T extends StateConstraint>(): new (
	initialState: T
) => ReturnStoreType<T> => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Store<State extends StateConstraint> {
		[key: string]: any;
	}
	class Store<State extends StateConstraint> implements StoreType<State> {
		private isHydrated = false;
		private listeners: CallBack<State>[] = [];
		private keySubscribers: SubscriberCallBacks<State> = {} as SubscriberCallBacks<State>;

		constructor(private state: State) {
			for (const key of Object.keys(this.state) as (keyof State)[]) {
				this.keySubscribers[key] = [];
			}
			this.createMethods();
		}

		hydrate(valueORcallback: SetStateFunctionArguments<State>) {
			if (this.isHydrated) return;

			const newVal =
				typeof valueORcallback === 'function'
					? valueORcallback(this.state as DeepReadonly<State>)
					: valueORcallback;

			this.state = newVal;
			this.isHydrated = true;
		}

		setState(valueORcallback: SetStateFunctionArguments<State>) {
			const newVal =
				typeof valueORcallback === 'function'
					? valueORcallback(this.state as DeepReadonly<State>)
					: valueORcallback;

			const shouldNotifyAll = !isEqual(this.state, newVal);

			if (!shouldNotifyAll) return;

			for (const key of Object.keys(this.state) as (keyof State)[]) {
				const shouldNotify = !isEqual(this.state[key], newVal[key]);

				if (shouldNotify) {
					this.state[key] = newVal[key];
					this.notifyKey(key);
				}
			}
			this.notifyAll();
		}

		subscribe(callback: CallBack<Readonly<State>>) {
			this.listeners.push(callback);
			return () => {
				deleteFromArray(this.listeners, callback);
			};
		}

		getState() {
			return this.state as DeepReadonly<State>;
		}

		subscribeKey<Key extends keyof State>(
			key: Key,
			callback: Key extends keyof State ? CallBack<State[Key]> : never
		) {
			this.keySubscribers[key].push(callback as CallBack<State[Key]>);
			return () => {
				deleteFromArray(this.keySubscribers[key], callback as CallBack<State[Key]>);
			};
		}

		private notifyKey(key: keyof State) {
			for (const callback of this.keySubscribers[key]) {
				callback(this.state[key]);
			}
		}

		private notifyAll() {
			for (const callback of this.listeners) {
				callback(this.state as DeepReadonly<State>);
			}
		}

		private createMethods() {
			for (const key of Object.keys(this.state) as (keyof State)[]) {
				Store.prototype[`set${capitalize(key as string) as Capitalize<keyof State & string>}`] =
					function (this: Store<State>, valueORcallback: any) {
						const newVal =
							typeof valueORcallback === 'function'
								? valueORcallback(this.state[key])
								: valueORcallback;

						const shouldNotify = !isEqual(this.state[key], newVal);

						if (shouldNotify) {
							this.state[key] = newVal;
							this.notifyKey(key);
							this.notifyAll();
						}
					};
			}
		}
	}
	return Store as unknown as new (initialState: T) => ReturnStoreType<T>;
};
