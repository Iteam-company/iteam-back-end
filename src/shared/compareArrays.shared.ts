const compareArrays = (arr1: [], arr2: []) => {
	// const array2Sorted = arr2.slice().sort();
	const difference: [] = [];

	const longest = arr1.length >= arr2.length ? arr1 : arr2;
	const shortest = arr1.length <= arr2.length ? arr1 : arr2;

	let result = true;

	longest.forEach((el) => {
		if (!shortest.includes(el)) {
			difference.push(el);
			result = false;
		}
	});

	return { result, difference };
};

export default compareArrays;
