/* eslint @typescript-eslint/interface-name-prefix: 0 */
import { AppEnvironment, IAppEnvs } from './app';
import { ISlackEnvs } from './slack';

interface AllAppEnvs extends IAppEnvs, ISlackEnvs {
	NODE_ENV: AppEnvironment;
	PWD: string;
}

export { AppEnvironment, AllAppEnvs };
