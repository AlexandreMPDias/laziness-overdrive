import { Options } from './helpers/common';
import { Constants } from '../types';

export const getConstants = async (options: Options): Promise<Constants> => {
	const { getBaseKeys, getControlKeys } = await import('./base-keys');
	const { getKeyNames } = await import('./key-names');

	const names = getKeyNames(options);

	const controlKeys = getControlKeys();

	return {
		keys: [...controlKeys, ...getBaseKeys(options)],
		isControlKey: (key: string) => controlKeys.includes(key),
		name: (key: string) => names[key],
	};
};
