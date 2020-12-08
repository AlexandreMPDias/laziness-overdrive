
export type Keys =
	| "app_install"
	| "optional_registration"
	| "class_extend_time"
	| "cancel_request"
	| "plan_request_tutor_change"
	| "report_unforeseen"
	| "sign_up"
	| "screen_view"
	| "family_add"
	| "family_link"
	| "purchase_flux_start"
	| "class_add"
	| "class_delete"
	| "select_subject"
	| "plan_define_duration"
	| "plan_define_frequency"
	| "open_calendar"
	| "complete_schedule_selection"
	| "use_coupon_on_flux"
	| "use_credits_on_flux"
	| "purchase_flux_abandon"
	| "purchase_flux_complete"
	| "tutor_accept_request"
	| "interact_with_app_simulator"
	| "share_coupon_code"
	| "class_reschedule_request"
	| "class_reschedule_complete"
	| "class_start"
	| "class_trigger_support"
	| "class_end"
	| "give_standard_feedback"
	| "uninstall_app"
	| "plan_complete"
	| "add_availability"


export type Apps = "App Cliente" | "App Tutor" | "Plataforma de Aula Online" | "Website";

function apps(...applications: Array<Apps>) {

	const options = ([
		{
			"id": "6fe35f97-f032-44cf-995b-41251482c9dc",
			"label": "App Cliente",
			"color": "#fec10d"
		},
		{
			"id": "54cf4c40-9c11-4000-8b9a-6ebae01f330f",
			"label": "App Tutor",
			"color": "#6f33b6"
		},
		{
			"id": "4655b24c-7f98-408a-9355-0cac8b826c37",
			"label": "Plataforma de Aula Online",
			"color": "#bf55ec"
		},
		{
			"id": "eee51d4b-7ec0-4ba6-a94d-985f2cddf11e",
			"label": "Website",
			"color": "#f9d900"
		}
	] as const).filter(x => applications.includes(x.label))

	return {
		"id": "20e55f6b-7d33-4ae7-8c2b-5dee95c712f3",
		"name": "Applications",
		"type": "labels",
		"type_config": {
			options
		},
		"date_created": "1606415869275",
		"hide_from_guests": false,
		"value": options.map(x => x.id)
	}
}

export type Prov = 'Intercom' | "Google Analytics"

function prov(...providers: Array<Prov>) {

	const options = ([
		{
			"id": "b41f1069-0391-4fd6-a8de-cc7a9afdca3f",
			"label": "Intercom",
			"color": "#0969d8"
		},
		{
			"id": "a08554cd-c49c-4b7d-9a7b-92401533d218",
			"label": "Google Analytics",
			"color": "#ff7800"
		}
	] as const).filter(opt => providers.includes(opt.label));

	return {
		"id": "88fde24a-ea7a-43c3-84ab-04fbc80e6705",
		"name": "Providers",
		"type": "labels",
		"type_config": { options },
		"date_created": "1606415708161",
		"hide_from_guests": false,
		"value": options.map(opt => opt.id)
	}
}

function translate(name: string) {
	return {
		"id": "b3c9c19c-0abd-4d13-86ce-821cc56ecc75",
		"name": "Translated Name",
		"type": "short_text",
		"type_config": {},
		"date_created": "1606436191561",
		"hide_from_guests": false,
		"value": name
	}
}

export default {
	apps,
	providers: prov,
	translate
}