import * as types from './types';
import { KeyPressView as IKeyPressView } from './protocol';
import { KeyPressViewAdapter } from './load';

const keyPressViewFactory = (): IKeyPressView => {
	return new KeyPressViewAdapter({
		log: console.log,
		color: true,
	});
};

export const KeyPressView = keyPressViewFactory();

export namespace KeyPressView {
	export type Mode = types.ViewMode;
	export type Payload<M extends Mode> = types.Payload<M>;
	export type Protocol = IKeyPressView;
}
