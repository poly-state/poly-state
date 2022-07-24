import { ReduxDevToolsConnection } from '../redux';
import { ReturnStoreType, StateConstraint } from '../types';

export const withDevTools = <T extends StateConstraint>(
	store: ReturnStoreType<T>,
	identifier: string
): ReturnStoreType<T> => {
	let devToolsInstance: ReduxDevToolsConnection | null = null;

	const connectToDevTools = () => {
		if (typeof window === 'undefined' || !window.__REDUX_DEVTOOLS_EXTENSION__ || devToolsInstance) {
			return;
		}

		devToolsInstance = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
			name: identifier,
			trace: true,
		});

		devToolsInstance.subscribe((message) => {
			if (message.type === 'DISPATCH' && message.state) {
				store.setState(message.state);
			}
		});

		devToolsInstance.init(store.getState());
	};

	connectToDevTools();

	const sendToDevtools = (action: string, state: unknown) => {
		if (!devToolsInstance) {
			connectToDevTools();
		}
		devToolsInstance?.send(action, state);
	};

	store.use({
		type: 'ALL_SETTERS',
		middleware: (payload, _, type) => {
			sendToDevtools(type, payload);
			return payload;
		},
	});

	store.use({
		type: 'HYDRATE',
		middleware: (payload: T) => {
			sendToDevtools('HYDRATE', payload);
			return payload;
		},
	});

	store.use({
		type: 'SET_STATE',
		middleware: (payload: T) => {
			sendToDevtools('SET_STATE', payload);
			return payload;
		},
	});

	return store;
};
