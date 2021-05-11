import { IKeyPress, IKey } from './types';
import { Filer } from '../../utils';
const keyKeys = ['keycode', 'rawcode', 'altKey', 'ctrlKey', 'metaKey', 'shiftKey'] as const;
const shortKeyKeys = ['keycode', 'rawcode'] as const;

export class KeyMapper {
	private source: Record<string, IKeyPress> = {};
	private keys: [string, IKeyPress][] = [];
	/**
	 * Record
	 */
	private specialKeys: Record<string, IKey[]> = {};

	public init = () => {
		const keyMapping = Filer.require('config/key.map.json');
		this.refresh(keyMapping);
	};

	public get = (keyPressed: IKeyPress): string | null => {
		return (
			this.keys.find(([_, values]) => {
				return this.isSameKey(values, keyPressed);
			})?.[0] ?? null
		);
	};

	public update = (nextValues: Record<string, IKey>): void => {
		this.refresh(nextValues);
		Filer.update('config/key.map.json', this.source);
	};

	public isSameKey = (key1?: IKeyPress, key2?: IKeyPress, mode: 'short' | 'full' = 'full') => {
		if (!key1 || !key2) return false;
		const keys = mode === 'full' ? keyKeys : shortKeyKeys;
		return keys.every(keyKey => this.isSameValue(key1, key2, keyKey));
	};

	public is = {
		specialKey: (keyPress?: IKeyPress): boolean => {
			if (!keyPress) return false;
			const specials = Object.keys(this.specialKeys);
			return specials.some(specialKeysKey => {
				const events = this.specialKeys[specialKeysKey];
				return events.some(keyEvent => this.isSameKey(keyEvent, keyPress, 'short'));
			});
		},
		knownKey: (keyPress?: IKeyPress | string): boolean => {
			if (!keyPress) return false;
			if (typeof keyPress === 'string') {
				return this.keys.some(([key]) => key === keyPress);
			}
			return this.keys.some(([_, value]) => this.isSameKey(keyPress, value, 'short'));
		},
	};

	private isSameValue = (key1: IKeyPress, key2: IKeyPress, keyKey: keyof IKeyPress): boolean => {
		const v1 = key1[keyKey] ?? false;
		const v2 = key2[keyKey] ?? false;
		return v1 === v2;
	};

	private refresh = (nextValues: Record<string, IKey>): void => {
		Object.assign(this.source, nextValues);

		this.keys = Object.entries(this.source);

		const findKeysMatching = (matcher: RegExp) => {
			return this.keys.filter(([key]) => key.match(matcher)).map(([_, event]) => event);
		};

		this.specialKeys = {
			esc: findKeysMatching(/esc/i),
			shift: findKeysMatching(/shift/i),
			alt: findKeysMatching(/alt/i),
			ctrl: findKeysMatching(/ctrl/i),
			// meta: findKeysMatching(/win|command|fn/i),
		};
	};
}

export * from './types';
export default new KeyMapper();
