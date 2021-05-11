import { KeyboardSetupAdapter } from './load';

export const makeKeyboardSetup = async () => {
	const { getConstants } = await import('./constants');
	return new KeyboardSetupAdapter(await getConstants({ hasNumpad: false }));
};
