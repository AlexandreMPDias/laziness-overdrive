/* eslint @typescript-eslint/interface-name-prefix: 0 */

import {
	AppEnvironment as AppEnvironmentImport,
	AllAppEnvs as AllAppEnvsImport,
} from './envs/index';

/**
 * Did this because for some reason, lint was saying that the types imported from './envs' were not being used.
 * This fixed the issue... for reasons unknown.
 */
type AppEnvironment = AppEnvironmentImport;
type AllAppEnvs = AllAppEnvsImport;

declare global {
	namespace App {
		type Environment = AppEnvironment;
	}

	namespace NodeJS {
		interface ProcessEnv extends AllAppEnvs {
			/**
			 * ! Leave empty here - ALWAYS.
			 */
		}

		interface Process {
			/**
			 * Get a value from the .env
			 *
			 * @param {keyof AllAppEnvs} envKey the key of the env
			 * @param {AllAppEnvs[Env]} defaultTo the value to be returned when a value cant be mapped
			 * using the envKey.
			 * INFO: Calling with this property, automatically makes the env key optional.
			 *
			 * @return {AllAppEnvs[Env]} the value of the value
			 *
			 * @throw {ReferenceError} if the env is not set, and they are not optional
			 */
			getEnv: <Env extends keyof AllAppEnvs>(
				envKey: Env,
				defaultTo?: AllAppEnvs[Env]
			) => AllAppEnvs[Env];
		}
	}
}

/**
 * If this file has no import/export statements (i.e. is a script)
 * convert it into a module by adding an empty export statement.
 *
 * [WARNING] Don't remove this. In case we remove the import in the future.
 */
export {};
