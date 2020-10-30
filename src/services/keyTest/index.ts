import ioHook from 'iohook';
import chalk from 'chalk';
import KeyMapper, { IKeyPress } from '../macros/mapper';

class KeyTest {

	public shortMode: boolean = true;
	public finalMode: boolean = false;

	public init = () => {
		let first = true;
		console.log('initializing');
		KeyMapper.init();
		ioHook.on('keydown', (keyPress: IKeyPress) => {
			if (this.finalMode) {
				const key = KeyMapper.get(keyPress);
				console.log(`Key pressed: [ ${key || 'NOT MAPPED'} ]`)
			}
			else if (this.shortMode) {
				if (first) {
					first = false;
					const out = Object.keys(keyPress).join(' | ');
					console.log(chalk.blue(out));
				}
				console.log(Object.values(keyPress).join(' | '));
			} else {
				console.log(keyPress);
			}
		})
	}
}

export default new KeyTest();