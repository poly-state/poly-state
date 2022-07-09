import { deepClone } from '../../utils';

describe('deepClone', () => {
	it('should return clone of the object', () => {
		const a = {
			foo: 'bar',
		};
		const b = deepClone(a);
		expect(b).not.toBe(a);
	});

	it('should return clone of the array', () => {
		const a = [1, 2, 3];
		const b = deepClone(a);
		expect(b).not.toBe(a);
	});

	it('should return clone of the object with nested', () => {
		const a = {
			foo: 'bar',
			nested: {
				foo: 'bar',
				bar: [
					1,
					2,
					3,
					{
						foo: 'bar',
						bar: [1, 2, 3],
					},
				],
			},
		};
		const b = deepClone(a);
		expect(b).not.toBe(a);
	});

	it('should return clone of the array with nested', () => {
		const a = [
			1,
			2,
			3,
			{
				foo: 'bar',
				bar: [
					1,
					2,
					3,
					{
						foo: 'bar',
						bar: [1, 2, 3],
					},
				],
			},
		];
		const b = deepClone(a);
		expect(b).not.toBe(a);
	});
});
