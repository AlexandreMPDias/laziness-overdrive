import { Importer, Log } from '../../helpers';

export async function start() {
	const { iohook, services } = await Importer.import('iohook', 'services');

	Log.starting.mode('listen');

	services.InactivityDetector.init();
	services.Macros.init();

	Log.initializing('iohook');
	iohook.start();
}
