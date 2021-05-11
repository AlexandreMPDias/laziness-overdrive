import chalk from 'chalk';
import { Color, ColorFn } from './types';

export const parseColor = (color?: Color): ColorFn => {
	if (color) {
		if (typeof color === 'function') {
			return color;
		}
		return chalk[color];
	}
	return chalk.white;
};
