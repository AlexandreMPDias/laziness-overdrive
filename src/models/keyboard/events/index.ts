interface IKey {
	keycode: number;
	rawcode: number;
}
export interface Api extends IKey {
	shiftKey?: boolean;
	altKey?: boolean;
	ctrlKey?: boolean;
	metaKey?: boolean;
}

export interface Parsed extends IKey {
	is: Record<'shift' | 'alt' | 'ctrl' | 'meta' | 'regular' | 'special', boolean>;
}

export const init = (event: Api): Parsed => {
	const { keycode, rawcode, ...special } = event;

	const isSpecial = special.altKey || special.ctrlKey || special.metaKey || special.shiftKey;

	const _is: Parsed['is'] = {
		regular: !isSpecial,
		special: isSpecial,
		shift: special.shiftKey,
		alt: special.altKey,
		ctrl: special.ctrlKey,
		meta: special.metaKey,
	};

	return {
		keycode,
		rawcode,
		is: _is,
	};
};
