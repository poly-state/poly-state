/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEqual } from 'lodash';
import {
	CallBack,
	ReturnStoreType,
	SetStateFunctionArguments,
	StateConstraint,
	StoreType,
	SubscriberCallBacks
} from './types';
import { capitalize } from './utils';

export const getStoreClass = <T extends StateConstraint>(): new (
	initialState: T
) => ReturnStoreType<T> => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Store<State extends StateConstraint> {
		[key: string]: any;
	}
	class Store<State extends StateConstraint> implements StoreType<State> {
		private isHydrated = false;
		private listeners = new Set<CallBack<Readonly<State>>>();
		private keySubscribers: SubscriberCallBacks<State> = {} as SubscriberCallBacks<State>;

		constructor(private state: State) {
			for (const key of Object.keys(this.state) as (keyof State)[]) {
				this.keySubscribers[key] = new Set();
			}
			this.createMethods();
		}

		hydrate(valueORcallback: SetStateFunctionArguments<State>) {
			if (!this.isHydrated) {
				const newVal =
					typeof valueORcallback === 'function' ? valueORcallback(this.state) : valueORcallback;
				this.state = newVal;
				this.isHydrated = true;
			}
		}

		setState(valueORcallback: SetStateFunctionArguments<State>) {
			const newVal =
				typeof valueORcallback === 'function' ? valueORcallback(this.state) : valueORcallback;

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
			this.listeners.add(callback);
			return () => this.listeners.delete(callback);
		}

		getState() {
			return this.state;
		}

		subscribeKey<Key extends keyof State>(
			key: Key,
			callback: Key extends keyof State ? CallBack<Readonly<State>[Key]> : never
		) {
			this.keySubscribers[key].add(callback as CallBack<Readonly<State[Key]>>);
			return () => {
				this.keySubscribers[key].delete(callback as CallBack<Readonly<State[Key]>>);
			};
		}

		private notifyKey(key: keyof State) {
			for (const callback of this.keySubscribers[key]) {
				callback(this.state[key]);
			}
		}

		private notifyAll() {
			for (const callback of this.listeners.keys()) {
				callback(this.state);
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
