import KeyMap, { IKeyPress } from './mapper';
import ioHook from 'iohook';
import chalk from 'chalk';
import Loader from './loader';
import Parser from './parser';
import { Key } from '../../models/keyboard/key';

class Macros {
	public init = () => {
		KeyMap.init();
		Loader.init();

		console.log(`Initializing [ ${chalk.redBright('Macros')} ]`);

		this.initKeyDownListener();
	};

	private actionDebounce: Record<string, number> = {};

	private down: Key[] = [];

	private initKeyDownListener = () => {
		console.log(`Initializing [ ${chalk.blueBright('KeyDown Listener')} ]`);
		ioHook.on('keyup', (keyPress: IKeyPress) => {
			this.down = this.down.filter(key => !key.equals(Key.eventToMetadata(keyPress)));
			console.log(this.down.map(x => x.name));
		});
		ioHook.on('keydown', (keyPress: IKeyPress) => {
			const metadata = Key.eventToMetadata(keyPress);
			if (this.down.find(downKey => downKey.equals(metadata))) return;

			const name = KeyMap.get(keyPress);
			if (!name) return;

			this.down.push(new Key(metadata, name));
			console.log(this.down.map(x => x.name));

			const actions = Loader.getCommand(this.down);
			if (!actions.length) return;

			Promise.all(
				actions.map(async action => {
					if (!this.canTrigger(action.cmd)) return;
					await Parser.handle(action.cmd, action.args);
				})
			);
		});
	};

	private canTrigger = (name: string): boolean => {
		const prev = this.actionDebounce[name] || 0;
		const diff = new Date().getTime() - prev;
		const ok = diff > 1000;
		if (ok) {
			this.actionDebounce[name] = new Date().getTime();
		} else {
			console.log(name, ' is stuck in debouncer');
		}
		return ok;
	};
}

export default new Macros();
