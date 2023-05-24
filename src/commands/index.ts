import { Command } from './helpers/command';

export async function execute(): Promise<void> {
	await import('../config');

	const commands = await import('./use-cases');

	const keyNameMap: Record<string, Command> = {};
	const KEYS = Object.values(commands).map(command => {
		keyNameMap[command.name] = command;
		return command.name;
	});

	const cmd = new Command({
		command: '<command>',
		description: 'Run a command',
		depth: 0,
	}).positional('command', {
		describe: 'command to run',
		choices: KEYS,
		demandOption: true,
	});

	const { command } = cmd.parse();

	await keyNameMap[command].execute();
}
