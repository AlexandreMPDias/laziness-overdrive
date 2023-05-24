import Slack from './slack';
import ClickUp from './clickUp';
import Toggl from './toggl';

export const Api = {
	slack: Slack,
	clickUp: ClickUp,
	toggl: Toggl,
};

export { Slack, ClickUp, Toggl };
