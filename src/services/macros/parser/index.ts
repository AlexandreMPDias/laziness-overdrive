import {
	MacroCommandDeclaration as AllDeclaration,
	SingleMacroCommand as AnyCommand,
} from '../types';
import { Api } from '../../../apis';
import inactivity from '../../inactivityDetector';

type Cmds = AnyCommand['cmd'];

type MapKey<CK extends Cmds> = {
	[K in keyof AllDeclaration]: AllDeclaration[K]['cmd'] extends CK ? K : never;
}[keyof AllDeclaration];

type Handlers = { [K in Cmds]: (args: AllDeclaration[MapKey<K>]['args']) => any };

class MacroParser {
	private handler: Handlers = {
		'slack.update.user.presence': args => {
			inactivity.enabled = args.presence === 'auto';
			if (args.presence === 'auto') {
				return Api.slack.status.setActive();
			}
			return Api.slack.status.setInactive();
		},
		'slack.update.user.status': args => {
			if (typeof args === 'string' && args === 'sextou') {
				const message = (() => {
					const day = new Date().getDay();
					const templates = ['Segundou', 'Terçou', 'Quartou', 'Quintou', 'Sextou'];
					return templates[day - 1] || 'Flw';
				})();
				return Api.slack.status.updateStatus(`${message} !!`, ':tada:');
			} else {
				return Api.slack.status.updateStatus(args.text, args.emoji, args.expiration);
			}
		},
		'timer.task.resume': async ({ provider }) => {
			inactivity.enabled = true;
			if (!provider || provider === 'toggl') {
				await Api.toggl.timeEntries.start();
			}
			if (!provider || provider === 'clickUp') {
				await Api.clickUp.timeTrack.start();
			}
		},
		'timer.task.stop': async ({ provider }) => {
			inactivity.enabled = false;
			if (!provider || provider === 'toggl') {
				await Api.toggl.timeEntries.stop();
			}
			if (!provider || provider === 'clickUp') {
				await Api.clickUp.timeTrack.stop();
			}
		},
		'timer.toggle': async () => {
			await Api.toggl.timeEntries.toggleLastOfTask();
		},
	};

	public handle = (cmd: AnyCommand['cmd'], arg: any): Promise<void> | void => {
		return this.handler[cmd]?.(arg || {});
	};
}
export default new MacroParser();
