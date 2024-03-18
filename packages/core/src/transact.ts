// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TODO = any;

const SymbolForGlobalTransaction = Symbol.for('GlobalTransaction-Poly-State');

export const getGlobalTransaction = () => {
	if (typeof window === 'undefined') {
		return {
			callBacks: new Map<string, () => void>(),
			running: false,
		};
	}

	const globalTransaction = (window as TODO)[SymbolForGlobalTransaction];

	if (!globalTransaction) {
		(window as TODO)[SymbolForGlobalTransaction] = {
			callBacks: new Map<string, () => void>(),
			running: false,
		};
	}

	return (window as TODO)[SymbolForGlobalTransaction] as {
		callBacks: Map<string, () => void>;
		running: boolean;
	};
};

export const transact = (cb: () => void) => {
	const globalTransaction = getGlobalTransaction();
	globalTransaction.running = true;
	cb();
	globalTransaction.callBacks.forEach((cb) => cb());
	globalTransaction.running = false;
};
