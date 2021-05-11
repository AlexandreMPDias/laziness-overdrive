export const imports = {
	chalk: async () => (await import('chalk')).default,
	iohook: async () => (await import('iohook')).default,
	services: async () => import('../../../services'),
	apis: async () => import('../../../apis'),
	models: async () => import('../../../models'),
	// config: async () => import ('../../../config'),
};

import { ImporterAdapter } from './load';

export const Importer = new ImporterAdapter(imports);

export default Importer.import;
