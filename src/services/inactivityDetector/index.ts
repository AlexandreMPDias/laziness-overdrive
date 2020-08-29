Promise = require('bluebird');
import ioHook from 'iohook';
import Bluebird from 'bluebird';
import Slack from '../slack';

class InactivityDetector {

	static readonly WAITING_TIME = 20 * 60 * 1000;
	private timer: Bluebird<void> = Promise.delay(0);

	public init = () => {
		ioHook.on('mousemove', this.setTimer);
		ioHook.on('keydown',async () => {
			await this.setTimer();
		})
	}

	private setTimer = async () => {
		this.timer.cancel();
		this.timer = Promise.delay(InactivityDetector.WAITING_TIME).then(() => {
			Slack.status.setInactive();
			Slack.status.updateStatus('Away~', ':away:');
		});
	}
}

export default new InactivityDetector;