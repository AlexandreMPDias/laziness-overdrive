import { Importer, Log } from '../../helpers';
import { KeyPressView } from '../../../services/key-press-view';

export async function keyMap(mode: KeyPressView.Mode) {
	const { iohook, services } = await Importer.import('iohook', 'services');

	Log.starting.mode(`keyboard.map - ${mode}`);

	services.KeyTest.finalMode = mode === 'full';
	services.KeyTest.shortMode = mode === 'short';
	services.KeyTest.init();

	Log.initializing('iohook');
	iohook.start();
}

export async function keyValidate(mode: KeyPressView.Mode) {
	const { iohook, services } = await Importer.import('iohook', 'services');

	Log.starting.mode('keyboard.map');

	services.KeyTest.finalMode = mode === 'full';
	services.KeyTest.shortMode = mode === 'short';
	services.KeyTest.init();

	Log.initializing('iohook');
	iohook.start();
}

export async function keySetup(mode: KeyPressView.Mode) {
	const { iohook, services } = await Importer.import('iohook', 'services');

	(global as any).addTimestamp = false;

	Log.starting.mode('keyboard.setup');

	const keyboardSetup = await services.makeKeyboardSetup();

	keyboardSetup.init();

	Log.initializing('iohook');
	keyboardSetup.start();
	iohook.start();
}
