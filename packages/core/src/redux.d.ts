/* eslint-disable @typescript-eslint/no-explicit-any */
type ReduxMessage = {
	type: 'DISPATCH' | 'ROLLBACK' | 'ACTION' | 'STATE' | 'ERROR';
	state: any;
};

export interface ReduxDevToolsConnection {
	send: (action: string, state: any) => void;
	subscribe: (message: (message: ReduxMessage) => void) => () => void;
	init: (state: any) => void;
	disconnect: () => void;
}

interface ReduxDevTools {
	connect: (options: any) => ReduxDevToolsConnection;
}

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION__: ReduxDevTools;
	}
}
export {};
