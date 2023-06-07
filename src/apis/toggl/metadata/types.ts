export interface ITogglCurrentUser {
	id: number;
	api_token: string;
	default_wid: number;
	email: string;
	fullname: string;
	jquery_timeofday_format: string;
	jquery_date_format: string;
	timeofday_format: string;
	date_format: string;
	store_start_and_stop_time: boolean;
	beginning_of_week: number;
	language: string;
	image_url: string;
	sidebar_piechart: boolean;
	at: Date;
	created_at: Date;
	retention: number;
	record_timeline: boolean;
	render_timeline: boolean;
	timeline_enabled: boolean;
	timeline_experiment: boolean;
	should_upgrade?: boolean;
	achievements_enabled?: boolean;
	timezone?: string;
	openid_enabled?: boolean;
	send_product_emails?: boolean;
	send_weekly_report?: boolean;
	send_timer_notifications?: boolean;
	last_blog_entry?: string;
	projects?: {
		id: number;
		name: string;
		wid: number;
		cid?: number;
		active: boolean;
		is_private: boolean;
		template?: boolean;
		template_id?: number;
		billable?: boolean;
		auto_estimates?: boolean;
		estimated_hours?: number;
		at: Date;
		color?: string;
		rate?: number;
		workspace_id: number;
	}[];
	tags: {
		id: number;
		name: string;
		workspace_id: string;
	}[];
	workspaces: {
		id: number;
		organization_id: number;
		name: string;
	}[];
}
