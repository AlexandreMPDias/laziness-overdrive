import { Importer, Log } from '../../helpers';
import { KeyPressView } from '../../../services/key-press-view';
import { Command } from '../../helpers/command';

const MODE = ['full', 'short'] as const;

export default new Command({
	description: 'Initialize keyboard setup',
	name: 'keyboard.setup',
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

		(global as any).addTimestamp = false;

		Log.starting.mode('keyboard.setup');

		const keyboardSetup = await services.makeKeyboardSetup();

		keyboardSetup.init();

		Log.initializing('iohook');
		keyboardSetup.start();
		iohook.start();
	});
