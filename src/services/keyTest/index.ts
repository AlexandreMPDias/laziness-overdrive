import ioHook from 'iohook';
import chalk from 'chalk';
import { IKeyPress } from '../macros/mapper/types';

class KeyTest {

	public shortMode: boolean = true;

	public init = () => {
		let first = true;
		console.log('initializing');
		ioHook.on('keydown',(keyPress: IKeyPress) => {
			if(this.shortMode) {
				if(first) {
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