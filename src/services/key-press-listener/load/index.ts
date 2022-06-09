import { IKeyPressListener } from '../protocols';
import { IKeyPressMatcher, IKeyPressParser } from '../protocols/helpers';

import { IUnknownKeyPress, DirtyListener, Key } from '../types';

export class KeyPressListenerAdapter implements IKeyPressListener {
	private readonly subscriptions: Partial<Record<Key, Array<IKeyPressListener.RegisterCallback>>>;

	constructor(
		private readonly listener: DirtyListener,
		private readonly parser: IKeyPressParser,
		public readonly match: IKeyPressMatcher
	) {}

	start = (): void => {
		this.listener.useRawcode(false);
		this.listener.setDebug(true);
		this.listener.on('keydown', (unknownKeyPress: IUnknownKeyPress) => {
			const keyPress = this.parser.keyPress(unknownKeyPress);
			if (keyPress) {
				const callbacks = this.subscriptions[keyPress.key];
				if (callbacks) {
					callbacks.forEach(callback => callback(keyPress));
				}
			}
		});
	};

	stop = () => {
		this.listener.removeAllListeners();
		this.listener.unload();
	};

	register = (key: Key | Key[], callback: IKeyPressListener.RegisterCallback): void => {
		if (Array.isArray(key)) {
			return this.registerShortcutEvent(key, callback);
		} else {
			return this.registerKeyEvent(key, callback);
		}
	};

	private registerKeyEvent = (key: Key, callback: IKeyPressListener.RegisterCallback): void => {
		if (!this.subscriptions[key]) {
			this.subscriptions[key] = [];
		}
		this.subscriptions[key].push(callback);
	};

	private registerShortcutEvent = (keys: Key[], callback: IKeyPressListener.RegisterCallback) => {
		const keycodes = keys.map(key => this.parser.key(key).keycode);
		this.listener.registerShortcut(keycodes, callback);
	};
}
