/* eslint-disable @typescript-eslint/no-explicit-any */
export const capitalize = (str: string) => `${str.charAt(0).toUpperCase()}${str.substring(1)}`;

export const deleteFromArray = <T>(array: T[], item: T): T[] => {
	const index = array.indexOf(item);
	if (index > -1) {
		array.splice(index, 1);
	}

	return array;
};

function isObject(obj: any): obj is Record<any, any> {
	return obj != null && obj.constructor.name === 'Object';
}

function isDateObject(obj: any): obj is Date {
	return obj != null && obj.constructor.name === 'Date';
}

export function isEqualArray(a: any[], b: any[]) {
	if (a.length !== b.length) {
		return false;
	}

	for (let i = 0; i < a.length; i++) {
		if (Array.isArray(a[i]) && Array.isArray(b[i])) {
			const isEqual = isEqualArray(a[i], b[i]);

			if (!isEqual) {
				return false;
			}
			continue;
		}

		if (isObject(a[i]) && isObject(b[i])) {
			const isEqual = isEqualObject(a[i], b[i]);

			if (!isEqual) {
				return false;
			}
			continue;
		}

		if (isDateObject(a[i]) && isDateObject(b[i])) {
			const isEqual = isEqualDate(a[i], b[i]);

			if (!isEqual) {
				return false;
			}
			continue;
		}

		if (a[i] !== b[i]) {
			return false;
		}
	}
	return true;
}

function isEqualDate(a: Date, b: Date) {
	return a.getTime() === b.getTime();
}

function isEqualObject(a: Record<any, any>, b: Record<any, any>) {
	const aKeys = Object.keys(a);
	const bKeys = Object.keys(b);

	if (aKeys.length !== bKeys.length) {
		return false;
	}

	for (const key of aKeys) {
		if (Array.isArray(a[key]) && Array.isArray(b[key])) {
			const isEqual = isEqualArray(a[key], b[key]);
			if (!isEqual) {
				return false;
			}
			continue;
		}

		if (isObject(a[key]) && isObject(b[key])) {
			const isEqual = isEqualObject(a[key], b[key]);
			if (!isEqual) {
				return false;
			}
			continue;
		}

		if (isDateObject(a[key]) && isDateObject(b[key])) {
			const isEqual = isEqualDate(a[key], b[key]);
			if (!isEqual) {
				return false;
			}
			continue;
		}

		if (a[key] !== b[key]) {
			return false;
		}
	}

	return true;
}

export const isEqual = (a: unknown, b: unknown): boolean => {
	if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();

	if (Array.isArray(a) && Array.isArray(b)) {
		return isEqualArray(a, b);
	}

	if (isObject(a) && isObject(b)) {
		return isEqualObject(a, b);
	}

	if (a === b) return true;

	return false;
};

export const getStoreIdentifier = (name: string) => {
	if (name !== '') return name;

	//generate a random name
	const randomName =
		Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	return `STORE_${randomName}`;
};

export const deepClone = <T>(a: T): T => {
	if (Array.isArray(a)) {
		return a.map(deepClone) as unknown as T;
	}

	if (isObject(a)) {
		const b: Record<any, any> = {};
		for (const key in a) {
			b[key] = deepClone(a[key]);
		}
		return b as unknown as T;
	}

	return a;
};
