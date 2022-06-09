import chalk from 'chalk';
import ioHook from 'iohook';
import KeyMapper, { IKeyPress } from '../macros/mapper';
import { KeyPressView } from '../key-press-view';
import { KeyIterator, KeyIteratorEvent } from './key-iterator';
import { Constants } from './types';

export class KeyboardSetupAdapter {
	private esc: IKeyPress | null = null;

	private record: Record<string, Pick<IKeyPress, 'keycode' | 'rawcode'>> = {};

	public readonly keyPressView: KeyPressView.Protocol = null as any;
	private iter: KeyIterator;

	constructor(private readonly consts: Constants) {
		this.keyPressView = KeyPressView.instance({}).setMode('short', {});
		this.iter = {} as any;
	}

	public init = () => {
		console.log('initializing');

		KeyMapper.init();

		const keys = this.consts.keys.filter(key => !KeyMapper.is.knownKey(key));

		this.esc = KeyMapper.getCode('esc');

		this.iter = new KeyIterator(keys, this.consts.name);

		this.iter.on('start', () => {
			this.pressKey(this.iter.currentKey);
		});

		this.iter.on('on-step', ({ key }) => {
			if (KeyMapper.is.knownKey(key)) {
				this.iter.next();
			}
		});

		this.iter.on('end', () => {
			console.log('end');
			ioHook.removeAllListeners('keydown');

			KeyMapper.update(this.record);
			process.exit(0);
		});
	};

	public start = () => {
		ioHook.on('keydown', this.onKeyDown);
		ioHook.on('keyup', this.onKeyUp);
		this.iter.start();
	};

	private onKeyUp = () => {
		const keyPress = this.iter.compileDownKeys();
		if (!this.esc) {
			this.esc = keyPress;
		}
		if (!keyPress) {
			console.log('Error - key-up receveid without a down key');
			return;
		}
		const isKnownKey = KeyMapper.is.knownKey(keyPress);

		if (isKnownKey) {
			if (!KeyMapper.is.specialKey(keyPress)) {
				console.log('not-special-key', keyPress);
				this.iter.next();
			}
			console.log('is-known-key', keyPress);
			return;
		}

		this.saveRecord(keyPress);
		this.iter.next();

		console.log('\n');
		this.pressKey(this.iter.currentKey);
	};

	private onKeyDown = (keyPress: IKeyPress) => {
		if (!this.iter.has('started')) {
			console.log(this.iter.currentKey);
			return;
		}
		if (this.esc && KeyMapper.isSameKey(keyPress, this.esc)) {
			this.iter.abort();
			return;
		}
		this.iter.appendDown(keyPress);
	};

	private saveRecord = ({ keycode, rawcode }: IKeyPress) => {
		this.record[this.iter.currentKey.key] = { keycode, rawcode };
	};

	private pressKey = ({ name, key }: KeyIteratorEvent) => {
		const n = chalk.green(name);
		if (key === 'esc') {
			console.log(`Press [ ${n} (${key}) ]`);
		} else {
			console.log(`Press [ ${n} (${key}) ], or [ ${chalk.red('esc')} ] to stop`);
		}
	};
}
