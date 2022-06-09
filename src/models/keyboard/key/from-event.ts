import { IKeyMetadata } from './types';

export interface IKeyEvent {
	keycode: number;
	rawcode: number;
}
export interface IKeyPressEvent extends IKeyEvent {
	shiftKey?: boolean;
	altKey?: boolean;
	ctrlKey?: boolean;
	metaKey?: boolean;
}

export const toMetadata = (event: IKeyPressEvent): Required<IKeyMetadata> => {
	return {
		keycode: event.keycode,
		rawcode: event.rawcode,
		shift: event.shiftKey,
		alt: event.altKey,
		ctrl: event.ctrlKey,
		meta: event.metaKey,
		fn: event.keycode === 0,
	};
};
