/* eslint @typescript-eslint/interface-name-prefix: 0 */

declare global {
	interface Console {
		/**
		 * Prints to `stdout` with newline. [but in green]
		 */
		success(message?: any, ...optionalParams: any[]): void;

		/**
		 * Prints to `stdout` with newline. Only when APP_ENV is set to [development] or [testing]
		 */
		debug(message?: any, ...optionalParams: any[]): void;
	}
}

/**
 * If this file has no import/export statements (i.e. is a script)
 * convert it into a module by adding an empty export statement.
 *
 * [WARNING] Don't remove this. In case we remove the import in the future.
 */
export {};
