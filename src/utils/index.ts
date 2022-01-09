export const capitalize = (str: string) => `${str.charAt(0).toUpperCase()}${str.substring(1)}`;

export const deleteFromArray = <T>(array: T[], item: T): T[] => {
	const index = array.indexOf(item);
	if (index > -1) {
		array.splice(index, 1);
	}

	return array;
};
