import iohook from 'iohook';
import { KeyPressMatcherAdapter, KeyPressParserAdapter } from './helpers';
import { KeyPressListenerAdapter } from './load';
import { IKeyPressListener } from './protocols';
import { loadKeyCodeMapping } from '../../config/keycode-mapping';

export const keyPressListenerFactory = async (): Promise<IKeyPressListener> => {
	const parser = new KeyPressParserAdapter(await loadKeyCodeMapping());
	const matcher = new KeyPressMatcherAdapter(parser);
	return new KeyPressListenerAdapter(iohook, parser, matcher);
};
