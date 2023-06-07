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

	runner = <A extends any[], R>(name: string, perform: (...args: A) => R) => {
		return new LogRunner(name, perform);
	};
}

export class LogRunner<A extends any[], R> {
	constructor(private readonly name: string, private readonly perform: (...args: A) => R) {}

	private log = (message: string, color: Color) => {
		const name = parseColor('cyan')(this.name);
		const string = `[ ${name} ]: ${message}`;
		console.log(parseColor(color)(string));
	};

	public handle = (...args: any): R => {
		this.log('starting', 'green');
		const output = this.perform(...args);

		if (output instanceof Promise) {
			output.then(() => {
				this.log('done', 'green');
			});
		} else {
			this.log('done', 'green');
		}
		return output;
	};
}
