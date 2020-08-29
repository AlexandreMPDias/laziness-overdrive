export type AppEnvironment = 'development' | 'staging' | 'production' | 'testing';

/**
 * ! App Envs
 *
 * Add here the Environment Variables from the [.env] file that are related to [ App ] itself
 */
export interface IAppEnvs {
	/**
	 * The App's Environment
	 *
	 * @default testing
	 */
	APP_ENV: AppEnvironment;

	/**
	 * The URL of Liber's API
	 */
	API_LIBEREDU_URL: string;
}
