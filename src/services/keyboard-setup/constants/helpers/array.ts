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
		return options.reduce((curr, opt: string) => {
			curr.push(
				...array.map(i => {
					let value: string = onEach;
					value = value.replace(/\{i\}/g, String(i));
					value = value.replace(/\{w\}/g, opt);
					return value;
				})
			);
			return curr;
		}, [] as string[]);
	}
	return array.map(onEach);
};

export const directions = (...axis: Array<'x' | 'y'>): Output => {
	const out: any = {};
	if (axis.includes('x')) Object.assign(out, { x: ['left', 'right'] });
	if (axis.includes('y')) Object.assign(out, { y: ['up', 'down'] });
	return parseObjectOfKeys(out);
};

export const parseObjectOfKeys = (keysObj: Record<string, string | string[]>): Output => {
	const values = Object.values(keysObj).map(entry =>
		Array.isArray(entry) ? entry : entry.split('')
	);
	return values.reduce((total, curr) => {
		total.push(...curr);
		return total;
	}, []);
};
