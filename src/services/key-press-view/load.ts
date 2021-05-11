import { IKeyPress } from '../macros/mapper';
import { ViewFn, ViewMode, ModeSetup } from './types';
import { KeyPressView, KeyPressViewOptions } from './protocol';
import { KeyTestHelpers } from './helpers';
import * as modes from './modes';

export class KeyPressViewAdapter implements KeyPressView {
	private mode: ViewMode;
	private payload: any = {};

	private readonly help: KeyTestHelpers;

	constructor(options: KeyPressViewOptions = {}) {
		this.help = new KeyTestHelpers(options);
		this.setMode('short', {});
	}

	public readonly instance = (options: KeyPressViewOptions): KeyPressView => {
		return new KeyPressViewAdapter(options);
	};

	public readonly setMode = <M extends ViewMode>(mode: M, args: ModeSetup[M]): KeyPressView => {
		const state = this.help.getModeInitialState(mode, args);
		this.mode = mode;
		this.payload = Object.assign({}, args, state);
		return this;
	};

	public readonly view = (keyPress: IKeyPress): void => {
		const method: ViewFn = modes[this.mode];

		return method({
			keyPress,
			help: this.help,
			payload: this.payload,
		});
	};
}
