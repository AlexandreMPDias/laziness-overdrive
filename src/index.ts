import './config';
let command: () => Promise<any> = async () => {
	const { execute } = await import('./commands');
	return execute();
};

// command = () => import('./services/temp');

command();
