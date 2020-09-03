import KeyMap, * as Keys from './mapper';
import ioHook from 'iohook';
import chalk from 'chalk';
import Loader from './loader';
import Parser from './parser';

class Macros {
	public init = () => {
		KeyMap.init();
		Loader.init();

		console.log(`Initializing [ ${chalk.redBright('Macros')} ]`);
		
		this.initKeyDownListener();
	}

	private initKeyDownListener = () => {
		console.log(`Initializing [ ${chalk.blueBright('KeyDown Listener')} ]`)
		ioHook.on('keydown', (keyPress: Keys.IKeyPress) => {
				const key = KeyMap.get(keyPress);
				if(key) {
					const actions = Loader.getCommand(key);
					Promise.all(actions.map(async action => {
						await Parser.handle(action.cmd, action.args);
					}))
				}
			})
	}
}

export default new Macros()