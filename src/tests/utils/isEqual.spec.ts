import { isEqual } from '../../utils';

describe('isEqual', () => {
	it('should return true, if the two objects are equal', () => {
		const a = {
			foo: 'bar',
		};
		const b = {
			foo: 'bar',
		};
		const result = isEqual(a, b);
		expect(result).toBe(true);
	});

	it('should return false, if the two objects are not equal', () => {
		const a = {
			foo: 'bar',
		};
		const b = {
			foo: 'baz',
		};
		const result = isEqual(a, b);
		expect(result).toBe(false);
	});

	it('should return true, if the two arrays are equal', () => {
		const a = [1, 2, 3];
		const b = [1, 2, 3];
		const result = isEqual(a, b);
		expect(result).toBe(true);
	});

	it('should return false, if the two arrays are not equal', () => {
		const a = [1, 2, 3];
		const b = [1, 2, 4];
		const result = isEqual(a, b);
		expect(result).toBe(false);
	});

	it('should return true, if the two dates are equal', () => {
		const a = new Date();
		const b = new Date();
		const result = isEqual(a, b);
		expect(result).toBe(true);
	});

	it('should return false, if the two dates are not equal', () => {
		const a = new Date();
		const b = new Date(a.getTime() + 1);
		const result = isEqual(a, b);
		expect(result).toBe(false);
	});

	it('should return true, if the two strings are equal', () => {
		const a = 'foo';
		const b = 'foo';
		const result = isEqual(a, b);
		expect(result).toBe(true);
	});

	it('should return false, if the two strings are not equal', () => {
		const a = 'foo';
		const b = 'bar';
		const result = isEqual(a, b);
		expect(result).toBe(false);
	});

	it('should return true, if the two numbers are equal', () => {
		const a = 1;
		const b = 1;
		const result = isEqual(a, b);
		expect(result).toBe(true);
	});

	it('should return false, if the two numbers are not equal', () => {
		const a = 1;
		const b = 2;
		const result = isEqual(a, b);
		expect(result).toBe(false);
	});

	it('should return true, if the two booleans are equal', () => {
		const a = true;
		const b = true;
		const result = isEqual(a, b);
		expect(result).toBe(true);
	});

	it('should return false, if the two booleans are not equal', () => {
		const a = true;
		const b = false;
		const result = isEqual(a, b);
		expect(result).toBe(false);
	});

	it('should return true, if the two nulls are equal', () => {
		const a = null;
		const b = null;
		const result = isEqual(a, b);
		expect(result).toBe(true);
	});

	it('should return false, if the two nulls are not equal', () => {
		const a = null;
		const b = undefined;
		const result = isEqual(a, b);
		expect(result).toBe(false);
	});

	it('should return true, if the two undefineds are equal', () => {
		const a = undefined;
		const b = undefined;
		const result = isEqual(a, b);
		expect(result).toBe(true);
	});

	it('should return false, if the two undefineds are not equal', () => {
		const a = undefined;
		const b = null;
		const result = isEqual(a, b);
		expect(result).toBe(false);
	});

	it('should return true, if the two nested objects are equal', () => {
		const a = {
			foo: 'bar',
			baz: {
				foo: 'bar',
			},
		};
		const b = {
			foo: 'bar',
			baz: {
				foo: 'bar',
			},
		};
		const result = isEqual(a, b);
		expect(result).toBe(true);
	});

	it('should return false, if the two nested objects are not equal', () => {
		const a = {
			foo: 'bar',
			baz: {
				foo: 'bar',
			},
		};
		const b = {
			foo: 'bar',
			baz: {
				foo: 'baz',
			},
		};
		const result = isEqual(a, b);
		expect(result).toBe(false);
	});

	it('should return true, if the two nested arrays are equal', () => {
		const a = [1, 2, [3, 4]];
		const b = [1, 2, [3, 4]];
		const result = isEqual(a, b);
		expect(result).toBe(true);
	});

	it('should return false, if the two nested arrays are not equal', () => {
		const a = [1, 2, [3, 4]];
		const b = [1, 2, [3, 5]];
		const result = isEqual(a, b);
		expect(result).toBe(false);
	});
});
