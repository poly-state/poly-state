/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReduxDevToolsConnection } from './redux';
import {
	CallBack,
	EqualityComparatorFunction,
	KeySubscriberFunction,
	ReturnStoreType,
	SetStateArgs,
	StateConstraint,
	StoreConfig,
	StoreMiddleWareFunction,
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

		private middleWares: StoreMiddleWareFunction<State>[] = [];

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

		hydrate(valueORcallback: SetStateArgs<State>) {
			if (this.isHydrated) return;

			const newVal =
				typeof valueORcallback === 'function' ? valueORcallback(this.state) : valueORcallback;

			const afterMiddleware = this.middleWares.reduce<State>((acc, middleware) => {
				if (middleware.type === 'HYDRATE') {
					return middleware.middleware(acc as any, this.state as any);
				}
				return acc;
			}, newVal);

			this.state = afterMiddleware;
			this.isHydrated = true;
			this.sendToDevtools?.('HYDRATE', this.state);
		}

		setState(valueORcallback: SetStateArgs<State>) {
			const newVal =
				typeof valueORcallback === 'function' ? valueORcallback(this.state) : valueORcallback;

			const afterMiddleware = this.middleWares.reduce<State>((acc, middleware) => {
				if (middleware.type === 'SET_STATE') {
					return middleware.middleware(acc as any, this.state as any);
				}
				return acc;
			}, newVal);

			const shouldNotifyAll = !this.isEqual(this.state, afterMiddleware);

			if (!shouldNotifyAll) return;

			for (const key of Object.keys(this.state) as (keyof State)[]) {
				const shouldNotify = !this.isEqual(this.state[key], newVal[key]);

				if (shouldNotify) {
					this.state[key] = newVal[key];
					this.notifyKey(key);
				}
			}
			this.notifySubscribers();
			this.sendToDevtools?.('SET_STATE', this.state);
		}

		subscribe(callback: CallBack<Readonly<State>>) {
			this.listeners.push(callback);
			return () => {
				deleteFromArray(this.listeners, callback);
			};
		}

		getState() {
			return this.state;
		}

		subscribeKey<Key extends keyof State>(key: Key, callback: KeySubscriberFunction<State, Key>) {
			this.keySubscribers[key].push(callback as unknown as CallBack<State[Key]>);
			return () => {
				deleteFromArray(this.keySubscribers[key], callback as unknown as CallBack<State[Key]>);
			};
		}

		use(middleware: StoreMiddleWareFunction<State>) {
			this.middleWares.push(middleware);

			return this;
		}

		private notifyKey(key: keyof State) {
			for (const callback of this.keySubscribers[key]) {
				callback(this.state[key]);
			}
		}

		private notifySubscribers() {
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

						const afterMiddleware = this.middleWares.reduce<State>((acc, middleware) => {
							if (
								middleware.type ===
								`set${capitalize(key as string) as Capitalize<keyof State & string>}`
							) {
								return middleware.middleware(acc as any, this.state[key] as any);
							}

							if (middleware.type === 'ALL_SETTERS') {
								return middleware.middleware(
									{ ...this.state, [key]: acc } as any,
									this.state as any
								);
							}

							return acc;
						}, newVal);

						const shouldNotify = !this.isEqual(this.state[key], afterMiddleware);

						if (shouldNotify) {
							this.state[key] = newVal;
							this.notifyKey(key);
							this.notifySubscribers();
						}

						this.sendToDevtools?.(`set${capitalize(key as string)}`, this.state);
					};
			}
		}

		private connectToDevTools() {
			if (typeof window !== undefined) {
				this.devToolsInstance = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
					name: this.storeIdentifier,
					trace: true,
					features: {
						dispatch: true,
					},
				});

				this.devToolsInstance.subscribe((message) => {
					if (message.type === 'DISPATCH' && message.state) {
						console.log('DevTools requested to change the state to', message.state);
						this.state = message.state;
						this.notifySubscribers();

						for (const [key, cb] of Object.entries(this.keySubscribers)) {
							cb(this.state[key]);
						}
					}
				});

				this.devToolsInstance.init(this.state);
			}
		}
	}
	return Store as unknown as new (initialState: T) => ReturnStoreType<T>;
};
