import { ViewFn } from '../../types';

export const short: ViewFn<'short'> = ({ keyPress, payload, help }) => {
	if (payload.first) {
		payload.first = false;
		const out = Object.keys(keyPress).join(' | ');
		help.log(help.paint('blue', out));
	}
	help.log(Object.values(keyPress).join(' | '));
};
