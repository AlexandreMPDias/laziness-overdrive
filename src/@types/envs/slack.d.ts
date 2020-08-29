/**
 * ! S;acl Envs
 *
 * Add here the Environment Variables from the [.env] file that are related to [ Slack ]
 */
export interface ISlackEnvs {
	SLACK_APP_ID: string;

	/**
	 * The password of the [BASIC_AUTH_USER]
	 */
	SLACK_SIGNING_SECRET: string;

	/**
	 * 
	 */
	SLACK_OAUTH: string;
	SLACK_TOKEN: string;

	/**
	 * 
	 */
	SLACK_MEMBER_ID: string
}