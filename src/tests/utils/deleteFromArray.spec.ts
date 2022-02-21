import { deleteFromArray } from '../../utils';

describe('deleteFromArray', () => {
	it('should delete an item from an array', () => {
		const array = [1, 2, 3];
		const item = 2;

		const result = deleteFromArray(array, item);
		expect(result).toEqual([1, 3]);
	});

	it('should not delete an item from an array if it is not in the array', () => {
		const array = [1, 2, 3];
		const item = 4;

		const result = deleteFromArray(array, item);
		expect(result).toEqual([1, 2, 3]);
	});
});
