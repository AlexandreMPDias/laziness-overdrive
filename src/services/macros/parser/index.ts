import * as types from '../types';
import Slack from '../../../apis/slack';

class MacroParser {

	private handler: Record<types.SingleMacroCommand['cmd'], (args: any) => (Promise<void> | void)> = {
		"slack.update.user.presence": (args: types.MacroCommandDeclaration['setPresence']['args']) => {
			if (args.presence === 'auto') {
				return Slack.status.setActive()
			}
			return Slack.status.setInactive();
		},
		"slack.update.user.status": (args: types.MacroCommandDeclaration['setStatus']['args']) => {
			if (typeof args === 'string') {
				const message = (() => {
					const day = new Date().getDay();
					const templates = ['Segundou', 'Terçou', 'Quartou', 'Quintou', 'Sextou'];
					return templates[day - 1] || 'Flw';
				})()
				return Slack.status.updateStatus(`${message} !!`, ':tada:');
			} else {
				return Slack.status.updateStatus(args.text, args.emoji, args.expiration);
			}
		}
	}

	public handle = (cmd: types.SingleMacroCommand['cmd'], arg: any): Promise<void> | void => {
		return this.handler[cmd]?.(arg);
	}

}
export default new MacroParser();