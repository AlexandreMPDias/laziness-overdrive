import { Requester } from '../../../services/utils/Requester';

export const TogglRequest = new Requester({
	baseUrl: 'https://api.track.toggl.com/api/v9/',
	headers: {
		Authorization: `Basic ${Buffer.from(`${process.env.TOGGL_TOKEN}:api_token`).toString(
			'base64'
		)}`,
	},
});
