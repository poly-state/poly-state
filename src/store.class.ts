/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEqual } from 'lodash';
import {
	CallBack,
	ReturnStoreType,
	SetTypeArg,
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
		protected listeners = new Map<CallBack<State>, boolean>();
		protected keySubscribers = new Map<keyof State, SubscriberCallBacks<State>[]>();

		constructor(protected state: State) {
			for (const key of Object.keys(this.state)) {
				this.keySubscribers.set(key, []);
			}
			this.createMethods();
		}

		hydrate(valueORcallback: SetTypeArg<State>) {
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

		setState(valueORcallback: SetTypeArg<State>) {
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

		subscribe(callback: CallBack<State>) {
			this.listeners.set(callback, true);
			return () => this.listeners.delete(callback);
		}

		getState() {
			return this.state;
		}

		subscribeKey<Key extends keyof State>(
			key: Key,
			callback: Key extends keyof State ? CallBack<State[Key]> : never
		) {
			this.keySubscribers.get(key)!.push(callback);
			return () => {
				const index = this.keySubscribers.get(key)!.indexOf(callback);
				if (index !== -1) {
					this.keySubscribers.get(key)?.splice(index, 1);
				}
			};
		}

		private notifyKey(key: keyof State) {
			for (const callback of this.keySubscribers.get(key) || []) {
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
