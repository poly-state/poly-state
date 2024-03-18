/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGlobalTransaction } from './transact';
import {
	AllSettersMiddlewareCallback,
	CallBack,
	GeneratedActions,
	MiddlewareCallback,
	ReturnStoreType,
	SetStateArgs,
	StateConstraint,
	StoreConfig,
	StoreMiddleWareFunction,
	StoreType,
} from './types';
import { capitalize, getStoreIdentifier, isFunction, shallowCompare } from './utils';

type StoreFactory<T extends StateConstraint> = new (
	initialState: T,
	config?: StoreConfig<T>
) => ReturnStoreType<T>;

export const getStoreClass = <T extends StateConstraint>(): StoreFactory<T> => {
	class Store<State extends StateConstraint> implements StoreType<State> {
		private id: string;

		private isHydrated = false;
		private listeners = new Set<CallBack<Readonly<State>>>();

		private SET_STATE_MIDDLEWARES: MiddlewareCallback<State>[] = [];
		private HYDRATE_MIDDLEWARES: MiddlewareCallback<State>[] = [];
		private ALL_SETTERS_MIDDLEWARES: AllSettersMiddlewareCallback<State>[] = [];
		private keyMiddlewares: GeneratedActions<State>[] = [];

		private get isEqual() {
			return this.config.equalityComparator || shallowCompare;
		}

		constructor(
			private state: State,
			private config: StoreConfig<State> = {
				equalityComparator: shallowCompare,
			}
		) {
			this.id = getStoreIdentifier('');
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
			this.config.onEvent?.SET_STATE?.(this.state);
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
			this.config.onEvent?.SET_STATE?.(this.state);

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
			const GLOBAL_TRANSACT = getGlobalTransaction();
			if (!GLOBAL_TRANSACT.running) {
				return this.flush();
			}

			if (GLOBAL_TRANSACT.callBacks.has(this.id)) {
				return;
			}

			GLOBAL_TRANSACT.callBacks.set(this.id, () => this.flush());
			return;
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

				(Store.prototype as any)[action] = function (this: Store<State>, valueORcallback: any) {
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

					if (!shouldNotify) {
						return;
					}

					this.state = { ...this.state, [key]: afterMiddleware };
					this.notifySubscribers();
					this.config.onEvent?.ALL_SETTERS?.(this.state);
					(this.config.onEvent?.[action] as Function | undefined)?.(afterMiddleware);
				};
			}
		}
	}
	return Store as unknown as new (initialState: T) => ReturnStoreType<T>;
};
