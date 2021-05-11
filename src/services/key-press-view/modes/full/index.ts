import { ViewFn } from '../../types';

export const full: ViewFn<'full'> = ({ keyPress, payload, help }) => {
	const key = payload.keyMapper.get(keyPress);
	help.log(`Key pressed: [ ${key || 'NOT MAPPED'} ]`);
};
