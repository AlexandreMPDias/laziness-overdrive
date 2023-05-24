import { Importer, Log, Command } from '../../helpers';

export default new Command({
	name: 'listener',
	description: 'Initialize keyboard listener',
	depth: 1,
}).withHandle(async () => {
	const { iohook, services } = await Importer.import('iohook', 'services');

	Log.starting.mode('listen');

	services.InactivityDetector.init(false);
	services.Macros.init();

	Log.initializing('iohook');
	iohook.start();
});
