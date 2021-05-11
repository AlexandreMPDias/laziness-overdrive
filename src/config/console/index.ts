import chalk from 'chalk';
import format from 'date-fns/format';

function now(): string {
	return chalk.cyan(format(new Date(), 'HH:mm dd/MM/yyyy'));
}

const log = console.log;

(global as any).addTimestamp = true;

(console as any).log = (...args: any[]) => {
	(global as any).addTimestamp && process.stdout.write(`[${now()}]: `);
	log(...args);
};
