import chalk from 'chalk';
import { ViewMode, ModeSetup, KeyPressViewOptions } from '../protocol';
import { ModeState, HelperMethods } from '../types';

export class KeyTestHelpers implements HelperMethods {
	public readonly options: Required<KeyPressViewOptions>;

	constructor(options: KeyPressViewOptions) {
		this.options = {
			log: options.log || console.log,
			color: options.color || false,
		};
	}

	public bundlePayload = (mode: ViewMode, payload: any = {}) => {
		const bundledPayload = Object.assign({ mode }, payload, this);

		return bundledPayload;
	};

	public getModeInitialState = <M extends ViewMode>(mode: M, args: ModeSetup[M]): any => {
		if (mode === 'full') {
			const state: ModeState['full'] = {};
			return state;
		} else if (mode === 'short') {
			const state: ModeState['short'] = { first: true };
			return state;
		}
		return {};
	};

	public readonly paint = (key: string, value: any): string => {
		if (this.options.color) {
			return chalk[key](value);
		} else {
			return value;
		}
	};

	public get log() {
		return this.options.log;
	}
}
