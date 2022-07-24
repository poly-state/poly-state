/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { capitalize, deepClone, deleteFromArray, isFunction } from './utils';

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
		private isEqual: EqualityComparatorFunction;

		private SET_STATE_MIDDLEWARES: MiddlewareCallback<State>[] = [];
		private HYDRATE_MIDDLEWARES: MiddlewareCallback<State>[] = [];
		private ALL_SETTERS_MIDDLEWARES: AllSettersMiddlewareCallback<State>[] = [];
		private keyMiddlewares: GeneratedActions<State>[] = [];

		constructor(
			private state: State,
			config: StoreConfig = {
				equalityComparator: (a, b) => a === b,
			}
		) {
			const { equalityComparator = (a, b) => a === b } = config;
			this.isEqual = equalityComparator;
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
			const newVal = isFunction(valueORcallback)
				? valueORcallback(deepClone(this.state))
				: valueORcallback;

			const afterMiddleware = this.SET_STATE_MIDDLEWARES.reduce(
				(acc, middleware) => middleware(acc, this.state),
				newVal
			);

			const shouldNotifyAll = !this.isEqual(this.state, afterMiddleware);

			// if there are no changes to the state, don't notify
			if (!shouldNotifyAll) return;
			this.state = newVal;
			//only notify keys that have changed
			this.notifySubscribers();
			return this;
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
			for (const callback of this.listeners) {
				callback(this.state);
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
