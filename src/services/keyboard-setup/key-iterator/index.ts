import { KeyIteratorEventCallback, KeyIteratorEvent, IKeyPress } from './types';

export class KeyIterator {
	private readonly iterator = { step: -1, done: false, max: -1 };
	private readonly eventListeners: Partial<KeyIteratorEventCallback> = {};

	public downs: IKeyPress[] = [];

	constructor(
		private readonly keys: string[],
		private readonly keyName: (key: string) => string
	) {
		this.iterator.max = this.keys.length - 1;
	}

	public get step() {
		return Math.max(this.iterator.step, 0);
	}

	public start = () => {
		this.iterator.step = 0;
		this.eventListeners.start?.();
	};

	public next = () => {
		this.incrementIteratorStep();
		if (this.iterator.done) {
			this.eventListeners.end?.();
		} else {
			this.eventListeners['on-step']?.(this.currentKey);
		}
	};

	public abort = () => {
		this.incrementIteratorStep(this.iterator.max);
		this.next();
	};

	public on = <E extends keyof KeyIteratorEventCallback>(
		event: E,
		callback: KeyIteratorEventCallback[E]
	): void => {
		this.eventListeners[event] = callback;
	};

	private incrementIteratorStep = (amount: number = 1) => {
		const { max } = this.iterator;
		const step = Math.min(this.iterator.step + amount, max);
		Object.assign(this.iterator, { step, done: step === max });
	};

	public get currentKey(): KeyIteratorEvent {
		const { step } = this.iterator;
		return {
			key: this.keys[step],
			name: this.keyName(this.keys[step]),
			step,
		};
	}

	public has = (state: 'started' | 'ended') => {
		const states: Record<typeof state, boolean> = {
			started: this.iterator.step >= 0,
			ended: this.iterator.done,
		};
		return states[state];
	};

	public appendDown = (down: IKeyPress) => {
		this.downs.push(down);
		return this;
	};

	public compileDownKeys = (): IKeyPress | null => {
		const downs = Array.from(this.downs);
		this.downs = [];
		if (downs.length === 0) return null;
		if (downs.length === 1) return downs[0];
		return downs.reduce((down, reduced) => {
			const isMeta =
				reduced.altKey ||
				reduced.ctrlKey ||
				reduced.shiftKey ||
				reduced.metaKey ||
				!reduced.keycode;
			if (isMeta) {
				down.altKey = down.altKey || reduced.altKey;
				down.ctrlKey = down.ctrlKey || reduced.ctrlKey;
				down.metaKey = down.metaKey || reduced.metaKey;
				down.shiftKey = down.shiftKey || reduced.shiftKey;
			} else {
				const { keycode, rawcode } = reduced;
				Object.assign(down, { keycode, rawcode });
			}
			return down;
		}, {} as IKeyPress);
	};
}

export * from './types';
