import { TogglRequest as api } from '../utils/request';
import { ITogglCurrentUser } from './types';
import { toggl } from '../../../models';

class TogglMetadataLoad {
	get = async (): Promise<toggl.Metadata> => {
		const { data } = await api.get<ITogglCurrentUser>('/me?with_related_data=true');

		const { id, projects, tags, workspaces } = data;

		return {
			userId: id,
			workspaceId: workspaces.find(workspace => workspace.name === 'Liber').id,
			tags: tags.map(({ id, name }) => ({ id, name })),
			projects: projects.map(({ id, name }) => ({ id, name })),
		};
	};
}

const TogglMetadata = new TogglMetadataLoad();

export default TogglMetadata;
