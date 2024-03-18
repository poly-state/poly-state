// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TODO = any;

const SymbolForGlobalTransaction = '__POLY_STATE_GLOBAL_TRANSACTION__';

export const getGlobalTransaction = () => {
	const defaultObject = {
		callBacks: new Map<string, () => void>(),
		running: false,
	};

	if (typeof globalThis === 'undefined') {
		throw new Error('Transact is not possible within this environment');
	}

	const globalTransaction = (globalThis as TODO)[SymbolForGlobalTransaction];

	if (!globalTransaction) {
		(globalThis as TODO)[SymbolForGlobalTransaction] = defaultObject;
	}

	return (globalThis as TODO)[SymbolForGlobalTransaction] as {
		callBacks: Map<string, () => void>;
		running: boolean;
	};
};

export const transact = (cb: () => void) => {
	const globalTransaction = getGlobalTransaction();
	globalTransaction.running = true;
	cb();
	globalTransaction.callBacks.forEach((cb) => cb());
	globalTransaction.callBacks.clear();
	globalTransaction.running = false;
};
