/* eslint-disable @typescript-eslint/no-explicit-any */
import { GLOBAL_TRANSACT } from './transact';
import {
	AllSettersMiddlewareCallback,
	CallBack,
	EqualityComparatorFunction,
	GeneratedActions,
	MiddlewareCallback,
	ReturnStoreType,
	SetStateArgs,
	StateConstraint,
	StoreConfig,
	StoreMiddleWareFunction,
	StoreType,
} from './types';
import { capitalize, isFunction } from './utils';

type StoreFactory<T extends StateConstraint> = new (
	initialState: T,
	config?: StoreConfig
) => ReturnStoreType<T>;

const defaultEqualityChecker = (a: any, b: any) => a === b;

export const getStoreClass = <T extends StateConstraint>(): StoreFactory<T> => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Store<State extends StateConstraint> {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: any;
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
	class Store<State extends StateConstraint> implements StoreType<State> {
		private id = `${Math.random()}${Date.now()}`;

		private isHydrated = false;
		private listeners = new Set<CallBack<Readonly<State>>>();
		private isEqual: EqualityComparatorFunction;

		private SET_STATE_MIDDLEWARES: MiddlewareCallback<State>[] = [];
		private HYDRATE_MIDDLEWARES: MiddlewareCallback<State>[] = [];
		private ALL_SETTERS_MIDDLEWARES: AllSettersMiddlewareCallback<State>[] = [];
		private keyMiddlewares: GeneratedActions<State>[] = [];

		constructor(private state: State, config: StoreConfig) {
			this.isEqual = config?.equalityComparator ?? defaultEqualityChecker;
			this.createMethods();
		}

		hydrate(valueORcallback: SetStateArgs<State>) {
			if (this.isHydrated) return;

			const newVal = isFunction(valueORcallback) ? valueORcallback(this.state) : valueORcallback;

			const afterMiddleware = this.HYDRATE_MIDDLEWARES.reduce(
				(acc, middleware) => middleware(acc, this.state),
				newVal
			);

			this.state = afterMiddleware;
			this.isHydrated = true;
		}

		setState(valueORcallback: SetStateArgs<State>) {
			const newVal = isFunction(valueORcallback) ? valueORcallback(this.state) : valueORcallback;

			const afterMiddleware = this.SET_STATE_MIDDLEWARES.reduce(
				(acc, middleware) => middleware(acc, this.state),
				newVal
			);

			const shouldNotifyAll = !this.isEqual(this.state, afterMiddleware);

			// if there are no changes to the state, don't notify
			if (!shouldNotifyAll) return;
			this.state = newVal;
			this.notifySubscribers();

			return this;
		}

		subscribe(callback: CallBack<Readonly<State>>) {
			this.listeners.add(callback);
			return () => {
				this.listeners.delete(callback);
			};
		}

		getState() {
			return this.state;
		}

		use(middleware: StoreMiddleWareFunction<State>) {
			switch (middleware.type) {
				case 'SET_STATE':
					this.SET_STATE_MIDDLEWARES.push(middleware.middleware as MiddlewareCallback<State>);
					break;
				case 'HYDRATE':
					this.HYDRATE_MIDDLEWARES.push(middleware.middleware as MiddlewareCallback<State>);
					break;
				case 'ALL_SETTERS':
					this.ALL_SETTERS_MIDDLEWARES.push(
						middleware.middleware as AllSettersMiddlewareCallback<State>
					);
					break;
				default:
					this.keyMiddlewares.push(middleware as GeneratedActions<State>);
					break;
			}

			return this;
		}

		private notifySubscribers() {
			if (GLOBAL_TRANSACT.running) {
				if (GLOBAL_TRANSACT.callBacks.has(this.id)) {
					return;
				}

				GLOBAL_TRANSACT.callBacks.set(this.id, () => {
					this.flush();
				});
				return;
			}

			this.flush();
		}

		private flush() {
			for (const listener of this.listeners) {
				listener(this.state);
			}
		}

		private createMethods() {
			for (const key of Object.keys(this.state) as (keyof State)[]) {
				const action = `set${capitalize(key as string)}` as `set${Capitalize<
					string & keyof State
				>}`;

				Store.prototype[action] = function (this: Store<State>, valueORcallback: any) {
					const newVal = isFunction(valueORcallback)
						? valueORcallback(this.state[key])
						: valueORcallback;

					const afterAllSettersMiddleware = this.ALL_SETTERS_MIDDLEWARES.reduce(
						(acc, middleware) => middleware(acc, this.state, action),
						{ ...this.state, [key]: newVal }
					);

					const afterMiddleware = this.keyMiddlewares.reduce<State>((acc, middleware) => {
						if (middleware.type === action) {
							return middleware.middleware(acc as any, this.state[key]);
						}

						return acc;
					}, afterAllSettersMiddleware[key]);

					const shouldNotify = !this.isEqual(this.state[key], afterMiddleware);

					if (shouldNotify) {
						this.state = { ...this.state, [key]: afterMiddleware };
						this.notifySubscribers();
					}
				};
			}
		}
	}
	return Store as unknown as new (initialState: T) => ReturnStoreType<T>;
};
