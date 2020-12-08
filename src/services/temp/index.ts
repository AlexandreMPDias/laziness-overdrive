import { ClickUp } from "../../apis";
import taskData from './taskData';

async function main() {

	// const task = await ClickUp.task.get('2q3cqa');
	// console.log(JSON.stringify(task.custom_fields, null, '\t'));

	for (const [key, body] of taskData) {
		console.log(`[ ${key} ] creating body`)
		await ClickUp.task.create('11401371', body);
		await new Promise(r => setTimeout(r, 500));
		console.log(`[ ${key} ] body created`)

	}
}


function apps(...applications: Array<"App Cliente" | "App Tutor" | "Plataforma de Aula Online" | "Website">) {

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

function prov(...providers: Array<'Intercom' | "Google Analytics">) {

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

main();
