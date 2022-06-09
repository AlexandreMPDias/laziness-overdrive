import { toMetadata } from './from-event';
import { IKeyMetadata } from './types';

export class Key {
	private _name: string | null;
	public readonly metadata: IKeyMetadata;

	public static eventToMetadata = toMetadata;

	constructor(metadata: IKeyMetadata, name?: string) {
		this._name = name || null;
		this.metadata = Object.assign(
			{},
			{
				shift: false,
				alt: false,
				ctrl: false,
				meta: false,
				fn: false,
			},
			metadata
		);
	}

	get name() {
		return this._name;
	}

	public equals(other: IKeyMetadata | Key): boolean {
		const otherMetadata = other instanceof Key ? other.metadata : other;
		return (
			this.metadata.rawcode === otherMetadata.rawcode &&
			this.metadata.shift === otherMetadata.shift &&
			this.metadata.keycode === otherMetadata.keycode &&
			this.metadata.alt === otherMetadata.alt &&
			this.metadata.ctrl === otherMetadata.ctrl &&
			this.metadata.meta === otherMetadata.meta &&
			this.metadata.fn === (otherMetadata.fn ?? false)
		);
	}

	public in = (others: IKeyMetadata[]) => {
		return others.some(other => this.equals(other));
	};

	public isSpecial = () => {
		const meta = this.metadata;
		return meta.shift || meta.alt || meta.ctrl || meta.meta || meta.fn;
	};
}
