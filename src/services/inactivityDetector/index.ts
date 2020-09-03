Promise = require('bluebird');
import ioHook from 'iohook';
import Bluebird from 'bluebird';
import Slack from '../slack';
import chalk from 'chalk';

class InactivityDetector {

	static readonly WAITING_TIME = 1;
	private timer: Bluebird<void> = Promise.delay(0);

	private get wait() {
		return InactivityDetector.WAITING_TIME * 60 * 1000;
	}

	public init = () => {
		console.log(`Initializing [ ${chalk.redBright('Inactivity Detection')} ]`);
		console.log(`Inactivity set to [ ${chalk.green(InactivityDetector.WAITING_TIME + ' minute')} ]`)
		ioHook.on('mousemove', this.setTimer);
		ioHook.on('keydown',this.setTimer);
	}

	private setTimer = async () => {
		this.timer.cancel();
		this.timer = Promise.delay(this.wait).then(() => {
			Slack.status.setInactive();
			Slack.status.updateStatus('Away~', ':away:');
		});
	}
}

export default new InactivityDetector;