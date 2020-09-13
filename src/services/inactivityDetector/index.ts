Promise = require('bluebird');
import ioHook from 'iohook';
import Bluebird from 'bluebird';
import Slack from '../slack';
import chalk from 'chalk';

class InactivityDetector {

	static readonly WAITING_TIME = 10;
	private timer: Bluebird<void> = Promise.delay(0);
	private lastMove: number = 0;

	private get wait() {
		return InactivityDetector.WAITING_TIME * 60 * 1000;
	}

	public init = () => {
		this.lastMove = new Date().getTime();
		setInterval(() => {
			const delta = new Date().getTime() - this.lastMove;
			if(delta > 1000) {
				console.log(`Inactivity detected of [ ${(delta / 1000 / 60).toFixed(0).padStart(2, '0')} minutes ]`);
			}
		}, 60 * 1000);
		console.log(`Initializing [ ${chalk.redBright('Inactivity Detection')} ]`);
		console.log(`Inactivity set to [ ${chalk.green(InactivityDetector.WAITING_TIME + ' minute')} ]`)
		ioHook.on('mousemove', this.setTimer);
		ioHook.on('keydown',this.setTimer);
	}

	private setTimer = async () => {
		this.lastMove = new Date().getTime();
		this.timer.cancel();
		this.timer = Promise.delay(this.wait).then(() => {
			Slack.status.setInactive();
			Slack.status.updateStatus('Away~', ':away:');
		});
	}
}

export default new InactivityDetector;