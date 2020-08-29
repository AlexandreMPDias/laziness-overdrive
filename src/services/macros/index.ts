import KeyMap, * as Keys from './mapper';
import ioHook from 'iohook';
import Slack from '../slack';

class Macros {
	private keyExecution: Partial<Record<string, VoidFunction>> = {
		SPC_1: () => {
			Slack.status.setActive();
			Slack.status.updateStatus('Working', ':fire:');
		},
		SPC_2: () => {
			Slack.status.setInactive();
			Slack.status.updateStatus('Away~', ':away:');
		},
	}

	public init = () => {
		ioHook.on('keydown', (keyPress: Keys.IKeyPress) => {
			const key = KeyMap.get(keyPress);
			if(key) {
				const action = this.keyExecution[key];
				if(action) {
					action();
				}
			}
		})
	}
}

export default new Macros()