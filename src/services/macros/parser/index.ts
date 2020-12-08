import * as types from '../types';
import { Api } from '../../../apis';
import inactivity from '../../inactivityDetector';

class MacroParser {

	private handler: Record<types.SingleMacroCommand['cmd'], (args: any) => (Promise<void> | void)> = {
		"slack.update.user.presence": (args: types.MacroCommandDeclaration['setPresence']['args']) => {
			inactivity.enabled = args.presence === 'auto'
			if (args.presence === 'auto') {
				return Api.slack.status.setActive()
			}
			return Api.slack.status.setInactive();
		},
		"slack.update.user.status": (args: types.MacroCommandDeclaration['setStatus']['args']) => {
			if (typeof args === 'string' && args === 'sextou') {
				const message = (() => {
					const day = new Date().getDay();
					const templates = ['Segundou', 'Terçou', 'Quartou', 'Quintou', 'Sextou'];
					return templates[day - 1] || 'Flw';
				})()
				return Api.slack.status.updateStatus(`${message} !!`, ':tada:');
			} else {
				return Api.slack.status.updateStatus(args.text, args.emoji, args.expiration);
			}
		},
		"clickUp.task.resume": (_: types.MacroCommandDeclaration['resumeLastTask']['args']) => {
			inactivity.enabled = true
			return Api.clickUp.timeTrack.start();
		},
		"clickUp.task.stop": (_: types.MacroCommandDeclaration['stopRunningTask']['args']) => {
			inactivity.enabled = false
			return Api.clickUp.timeTrack.stop();
		},
	}

	public handle = (cmd: types.SingleMacroCommand['cmd'], arg: any): Promise<void> | void => {
		return this.handler[cmd]?.(arg || {});
	}

}
export default new MacroParser();