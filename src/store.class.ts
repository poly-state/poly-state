import { ReduxDevToolsConnection } from './redux';
import {
	CallBack,
	EqualityComparatorFunction,
	KeySubscriberFunction,
	ReturnStoreType,
	SetStateFunction,
	StateConstraint,
	StoreConfig,
	StoreType,
	SubscriberCallBacks,
} from './types';
import { capitalize, deleteFromArray, getStoreIdentifier, isEqual } from './utils';

type StoreFactory<T extends StateConstraint> = new (
	initialState: T,
	config?: StoreConfig
) => ReturnStoreType<T>;

export const getStoreClass = <T extends StateConstraint>(): StoreFactory<T> => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Store<State extends StateConstraint> {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: any;
	}
	class Store<State extends StateConstraint> implements StoreType<State> {
		private isHydrated = false;
		private listeners: CallBack<State>[] = [];
		private keySubscribers: SubscriberCallBacks<State> = {} as SubscriberCallBacks<State>;
		private isEqual: EqualityComparatorFunction;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		private sendToDevtools: ((action: string, state: any) => void) | null = null;
		private devToolsInstance: ReduxDevToolsConnection | null = null;
		private storeIdentifier: string;

		constructor(
			private state: State,
			config: StoreConfig = {
				enableDevTools: false,
				equalityComparator: isEqual,
				storeIdentifier: '',
			}
		) {
			const { enableDevTools = false, equalityComparator = isEqual, storeIdentifier = '' } = config;

			this.isEqual = equalityComparator;
			this.storeIdentifier = getStoreIdentifier(storeIdentifier);

			if (enableDevTools) {
				this.connectToDevTools();
				this.sendToDevtools = function (action: string, state: unknown) {
					if (!this.devToolsInstance) {
						this.connectToDevTools();
					}
					this.devToolsInstance?.send(action, state);
				};
			}

			for (const key of Object.keys(this.state) as (keyof State)[]) {
				this.keySubscribers[key] = [];
			}
			this.createMethods();
		}

		hydrate: SetStateFunction<State> = (valueORcallback) => {
			if (this.isHydrated) return;

			const newVal =
				typeof valueORcallback === 'function' ? valueORcallback(this.state) : valueORcallback;

			this.state = newVal;
			this.isHydrated = true;
			this.sendToDevtools?.('HYDRATE', this.state);
		};

		setState: SetStateFunction<State> = (valueORcallback) => {
			const newVal =
				typeof valueORcallback === 'function' ? valueORcallback(this.state) : valueORcallback;

			const shouldNotifyAll = !this.isEqual(this.state, newVal);

			if (!shouldNotifyAll) return;

			for (const key of Object.keys(this.state) as (keyof State)[]) {
				const shouldNotify = !this.isEqual(this.state[key], newVal[key]);

				if (shouldNotify) {
					this.state[key] = newVal[key];
					this.notifyKey(key);
				}
			}
			this.notifyAll();
			this.sendToDevtools?.('SET_STATE', this.state);
		};

		subscribe(callback: CallBack<Readonly<State>>) {
			this.listeners.push(callback);
			return () => {
				deleteFromArray(this.listeners, callback);
			};
		}

		getState() {
			return this.state;
		}

		subscribeKey: KeySubscriberFunction<State, keyof State> = (key, callback) => {
			this.keySubscribers[key].push(callback);
			return () => {
				deleteFromArray(this.keySubscribers[key], callback);
			};
		};

		private notifyKey(key: keyof State) {
			for (const callback of this.keySubscribers[key]) {
				callback(this.state[key]);
			}
		}

		private notifyAll() {
			for (const callback of this.listeners) {
				callback(this.state);
			}
		}

		private createMethods() {
			for (const key of Object.keys(this.state) as (keyof State)[]) {
				Store.prototype[`set${capitalize(key as string) as Capitalize<keyof State & string>}`] =
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					function (this: Store<State>, valueORcallback: any) {
						const newVal =
							typeof valueORcallback === 'function'
								? valueORcallback(this.state[key])
								: valueORcallback;

						const shouldNotify = !this.isEqual(this.state[key], newVal);

						if (shouldNotify) {
							this.state[key] = newVal;
							this.notifyKey(key);
							this.notifyAll();
						}
						this.sendToDevtools?.(`set${capitalize(key as string)}`, this.state);
					};
			}
		}

		private connectToDevTools() {
			if (typeof window !== undefined) {
				this.devToolsInstance = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
					name: this.storeIdentifier,
				});

				this.devToolsInstance.subscribe((message) => {
					if (message.type === 'DISPATCH' && message.state) {
						console.log('DevTools requested to change the state to', message.state);
						this.state = message.state;
						this.notifyAll();
						for (const key of Object.keys(this.state) as (keyof State)[]) {
							this.notifyKey(key);
						}
					}
				});

				this.devToolsInstance.init(this.state);
			}
		}
	}
	return Store as unknown as new (initialState: T) => ReturnStoreType<T>;
};
