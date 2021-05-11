import { Options, makeFn } from './helpers/common';

type Output = Record<string, string>;

const isLetter = (char: string) => !!char.match(/^[a-z]$/i);

const getRenameableKeys = (options: Options): Output => {
	return {
		arrow_left: 'Arrow Left',
		arrow_right: 'Arrow Right',
		arrow_up: 'Arrow Up',
		arrow_down: 'Arrow Down',
	};
};

const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

export const getKeyNames = makeFn<Record<string, string>>(options => {
	const renameable = getRenameableKeys(options);

	return new Proxy(renameable, {
		get: (target, key: string) => {
			if (!target[key]) {
				if (key.match(/_/)) {
					return key.split('_').map(capitalize).join(' ');
				}
				return key;
			}
			return target[key] || key;
		},
	});
});
