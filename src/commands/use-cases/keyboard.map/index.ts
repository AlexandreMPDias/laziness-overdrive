import { Importer, Log } from '../../helpers';
import { Command } from '../../helpers/command';

const MODE = ['full', 'short'] as const;

export default new Command({
	description: 'Debug keyboard key mapping',
	name: 'keyboard.map',
	depth: 1,
})
	.options({
		mode: {
			alias: ['m'],
			choices: MODE,
			description: 'Mode of execution',
			default: 'short',
		},
	})
	.withHandle(async ({ mode }) => {
		const { iohook, services } = await Importer.import('iohook', 'services');

		Log.starting.mode(`keyboard.map - ${mode}`);

		services.KeyTest.finalMode = mode === 'full';
		services.KeyTest.shortMode = mode === 'short';
		services.KeyTest.init();

		Log.initializing('iohook');
		iohook.start();
	});
