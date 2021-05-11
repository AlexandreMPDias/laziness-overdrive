import { KeyMapper, IKeyPress } from '../macros/mapper';

export { KeyMapper, IKeyPress };

export type Log = (values: any) => void;

export interface ModeSetup {
	short: {};

	full: {
		keyMapper: KeyMapper;
	};
}

export type ViewMode = keyof ModeSetup;

export interface KeyPressViewOptions {
	log?: Log;
	color?: boolean;
}

export interface KeyPressView {
	instance(options: KeyPressViewOptions): KeyPressView;
	setMode<M extends ViewMode>(mode: M, args: ModeSetup[M]): KeyPressView;
	view(keyPress: IKeyPress): void;
}
