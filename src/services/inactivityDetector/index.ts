Promise = require('bluebird');
import ioHook from 'iohook';
import Bluebird from 'bluebird';
import Slack from '../../apis/slack';
import chalk from 'chalk';

class InactivityDetector {
	static readonly WAITING_TIME = 10;
	private timer: Bluebird<void> = Promise.delay(0);
	private lastMove: number = 0;
	private _enabled: boolean = false;

	private get wait() {
		return InactivityDetector.WAITING_TIME * 60 * 1000;
	}

	public init = (on: boolean = true) => {
		if (!on) {
			console.log(`WARNING: [ ${chalk.redBright('Inactivity Detection')} ] is disabled`);
			return;
		}
		this._enabled = true;
		this.lastMove = new Date().getTime();
		setInterval(() => {
			const delta = new Date().getTime() - this.lastMove;
			if (delta > 1000) {
				if (this._enabled) {
					console.log(
						`Inactivity detected of [ ${(delta / 1000 / 60)
							.toFixed(0)
							.padStart(2, '0')} minutes ]`
					);
				}
			}
		}, 60 * 1000);
		console.log(`Initializing [ ${chalk.redBright('Inactivity Detection')} ]`);
		console.log(
			`Inactivity set to [ ${chalk.green(InactivityDetector.WAITING_TIME + ' minute')} ]`
		);
		ioHook.on('mousemove', this.setTimer);
		ioHook.on('keydown', this.setTimer);
	};

	private setTimer = async () => {
		this.lastMove = new Date().getTime();
		this.timer.cancel();
		this.timer = Promise.delay(this.wait).then(() => {
			if (this._enabled) {
				Slack.status.setInactive();
				Slack.status.updateStatus('Away~', ':away:');
			}
		});
	};

	public set enabled(value: boolean) {
		if (value && !this._enabled) {
			console.log(`Inactivity Detection is now ${chalk.green('enabled')}`);
		} else if (!value && this._enabled) {
			console.log(`Inactivity Detection is now ${chalk.red('disabled')}`);
		}
		this._enabled = value;
	}
}

export default new InactivityDetector();
