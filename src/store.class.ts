/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEqual } from 'lodash';
import {
	CallBack,
	ReturnStoreType,
	SetStateFunctionArguments,
	StateConstraint,
	StoreType,
	SubscriberCallBacks,
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
		protected isHydrated = false;
		protected listeners = new Set<CallBack<Readonly<State>>>();
		protected keySubscribers: SubscriberCallBacks<State> = {} as SubscriberCallBacks<State>;

		constructor(protected state: State) {
			for (const key of Object.keys(this.state) as (keyof State)[]) {
				this.keySubscribers[key] = new Set();
			}
			this.createMethods();
		}

		hydrate(valueORcallback: SetStateFunctionArguments<State>) {
			if (!this.isHydrated) {
				const newVal =
					typeof valueORcallback === 'function' ? valueORcallback(this.state) : valueORcallback;
				for (const key of Object.keys(this.state)) {
					if (this.state[key] !== newVal[key]) {
						this.state = { ...this.state, [key]: newVal[key] };
						this.notifyKey(key);
					}
				}
				this.isHydrated = true;
				this.notifyAll();
			}
		}

		setState(valueORcallback: SetStateFunctionArguments<State>) {
			const newVal =
				typeof valueORcallback === 'function' ? valueORcallback(this.state) : valueORcallback;

			const shouldNotifyAll = !isEqual(this.state, newVal);

			if (!shouldNotifyAll) {
				return;
			}

			for (const key of Object.keys(this.state)) {
				const shouldNotify = !isEqual(this.state[key], newVal[key]);
				this.state = { ...this.state, [key]: newVal[key] };
				if (shouldNotify) {
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
			callback: Key extends keyof State ? CallBack<Readonly<State[Key]>> : never
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
			for (const key of Object.keys(this.state) as string[]) {
				Store.prototype[`set${capitalize(key)}`] = function (
					this: Store<State>,
					valueORcallback: any
				) {
					const newVal =
						typeof valueORcallback === 'function'
							? valueORcallback(this.state[key])
							: valueORcallback;
					const shouldNotify = !isEqual(this.state[key], newVal);
					this.state = { ...this.state, [key]: newVal };
					if (shouldNotify) {
						this.notifyKey(key);
						this.notifyAll();
					}
				};
			}
		}
	}
	return Store as unknown as new (initialState: T) => ReturnStoreType<T>;
};
