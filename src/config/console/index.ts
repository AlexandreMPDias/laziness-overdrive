import chalk from 'chalk';
import format from 'date-fns/format';

function now(): string {
	return chalk.cyan(format(new Date(), 'HH:mm dd/MM/yyyy'))
}

const log = console.log;

(console as any).log = (...args: any[]) => {
	process.stdout.write(`[${now()}]: `);
	log(...args);
}