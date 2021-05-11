import { make, parseObjectOfKeys, directions } from './helpers/array';

interface Options {
	hasNumpad?: boolean;
}

export const getControlKeys = (): string[] => {
	return [
		'esc',
		...make('{w}_ctrl', directions('x')),
		...make('{w}_shift', directions('x')),
		...make('{w}_alt', directions('x')),
	];
};

export const getBaseKeys = (options: Options = {}): string[] => {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

	const makeSymbols = (): string[] =>
		parseObjectOfKeys({
			mathSymbols: '*%-+=',
			marks: ':;,.?!',
			quotations: '`\'"',
			brackets: '[]{}()',
			bars: '\\/|',
			others: '@#$%^&_~',
		});

	const makeNumpadKeys = (): string[] => {
		if (!options.hasNumpad) return [];
		return parseObjectOfKeys({
			numbers: make('numpad:{i}', 10),
			symbols: make('number:{w}', ['/', '*', '-', '+']),
		});
	};

	const makeSpecialKeys = (): string[] =>
		parseObjectOfKeys({
			arrows: make('arrow_{w}', directions('x', 'y')),
		}).concat([
			'backspace',
			'enter',
			'space-bar',
			'print-screen',
			'insert',
			'delete',
			'home',
			'end',
			'page-up',
			'page-down',
			'fn',
		]);

	const BaseKeys: string[] = [
		'tab',
		'caps_lock',
		...make('{i}', 10),
		...make('f{i}', 10),
		...makeSymbols(),
		...makeSpecialKeys(),
		...makeNumpadKeys(),
		...alphabet,
	];

	return Array.from(new Set(BaseKeys).values());
};
