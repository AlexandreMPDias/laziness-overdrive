export const parseBaseKeys = (keys: string[]): string[] => {
	const unique = Array.from(new Set<string>(keys).values());

	const lowercase = unique.map(key => key.toLowerCase());

	return lowercase;
};

export interface Options {
	hasNumpad?: boolean;
}

export const makeFn = <T>(cb: (options: Options) => T): ((options?: Options) => T) => {
	const defaultOptions: Options = {};
	return (options?: Options): T => cb(options || defaultOptions);
};
