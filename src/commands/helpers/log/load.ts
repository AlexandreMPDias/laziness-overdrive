import { Color, ColorFn, Paint } from './types';
import { parseColor } from './helpers';

export class LogAdapter {
	constructor(private readonly paint: Paint) {}

	initializing = (service: string, color: Color = 'blue') => {
		console.log(`Initializing [ ${parseColor(color)(service)} ]`);
	};

	starting = {
		mode: (mode: string, color: Color = 'red') => {
			console.log(`Starting in [ ${parseColor(color)(mode)} ] mode`);
		},
	};
}
