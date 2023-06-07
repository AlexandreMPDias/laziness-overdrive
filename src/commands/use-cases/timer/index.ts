import { Command } from '../../helpers/command';

import Stop from './stop';
import Start from './start';

const Commands = [Start, Stop];

export default new Command({
	command: '<key>',
	description: 'Run clickup commands',
	name: 'timer',
	depth: 1,
})
	.positional('key', {
		choices: Commands.map(cmd => cmd.name),
		demandOption: true,
		description: 'subcommand to execute',
	})
	.withHandle(async ({ key }) => {
		const cmd = Commands.find(cmd => cmd.name === key);
		return cmd.execute();
	});
