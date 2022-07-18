import { capitalize } from '../../utils';

describe('capitalize', () => {
	it('should capitalize the first letter of a string', () => {
		expect(capitalize('foo')).toBe('Foo');
	});

	it('should not change the case of the first letter of a string', () => {
		expect(capitalize('Foo')).toBe('Foo');
	});
});
