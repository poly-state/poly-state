import { getStoreIdentifier } from '../../utils';

describe('getStoreIdentifier', () => {
	it('should return the store identifier', () => {
		const name = 'foo';
		const result = getStoreIdentifier(name);
		expect(result).toBe('foo');
	});

	// it('should return a random name, if the name is empty', () => {
	// 	const name = '';
	// 	const regex = /^STORE_[0-9a-zA-Z]{21}$/;
	// 	const result = getStoreIdentifier(name);
	// 	expect(regex.test(result)).toBe(true);
	// });
});
