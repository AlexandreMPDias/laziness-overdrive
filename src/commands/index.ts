import minimist from 'minimist';
import * as commands from './use-cases';

export async function execute(): Promise<void> {
	await import('../config');

	const argv = minimist(process.argv.slice(2));
	const {
		_: [name, ...args],
	} = argv;

	if (name.match(/^key/)) {
		const mode = !!argv.f ? 'full' : 'short';
		if (name === 'key.map') {
			return commands.keyMap(mode);
		} else if (name === 'key.setup') {
			return commands.keySetup(mode);
		} else {
			console.warn('No command matched: ', name);
		}
	} else if (name === 'clickUp') {
		const key = args[0];
		return commands.clickUp(key as any);
	}
	return commands.start();
}
