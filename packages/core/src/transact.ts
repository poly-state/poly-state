export const GLOBAL_TRANSACT = {
	callBacks: new Map<string, () => void>(),
	running: false,
};

export const transact = (cb: () => void) => {
	GLOBAL_TRANSACT.running = true;
	cb();
	GLOBAL_TRANSACT.callBacks.forEach((cb) => cb());
	GLOBAL_TRANSACT.running = false;
};
