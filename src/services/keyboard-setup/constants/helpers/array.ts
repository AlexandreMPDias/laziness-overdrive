type Output = string[];

export * from './common';

export const make = (
	onEach: string | ((index: number) => string),
	optionsOrSize: number | string[] = ['']
): Output => {
	const size = Array.isArray(optionsOrSize) ? optionsOrSize.length || 1 : optionsOrSize;
	const options = Array.isArray(optionsOrSize) ? optionsOrSize : [];

	const array: number[] = Array.from({ length: size }).map((_, index) => index);

	if (typeof onEach === 'string') {
		return options.reduce((curr: string[], opt: string) => {
			curr.push(
				array.reduce((str, i) => {
					let value: string = str;
					value = value.replace(/\{i\}/g, String(i));
					value = value.replace(/\{w\}/g, opt);
					return value;
				}, onEach)
			);
			return curr;
		}, []);
	}
	return array.map(onEach);
};

export const directions = (...axis: Array<'x' | 'y'>): Output => {
	const out: string[] = [];
	if (axis.includes('x')) out.push('left', 'right');
	if (axis.includes('y')) out.push('up', 'down');
	return out;
};

const multi = (arr: string | string[]): string[] => {
	return Array.isArray(arr) ? arr : arr.split('');
};

export const parseObjectOfKeys = (keysObj: Record<string, string | string[]>): Output => {
	const values = Object.values(keysObj).map(multi);
	return values.reduce((total, curr) => {
		total.push(...curr);
		return total;
	}, []);
};
