import _, { Keys, Apps, Prov } from './help'
import descriptions from './descriptions';

const _ext = (key: Keys, name: string, providers: Prov[], [app]: Array<Apps | 'App *'>): ClickUp.Task.Request => {

	const desc = descriptions[key];

	const _providers = desc.length > 0 ? (['Google Analytics', 'Intercom'] as const).filter(p => Boolean(desc.match(new RegExp(p, 'gm')))) : providers;

	const hasIntercom = desc.match(/Intercom/gm);

	const apps = app === 'App *' ? ['App Cliente', 'App Tutor'] as const : [app]

	return {
		name,
		description: `Identificador: ${key}\n\n${desc.length > 0 ? desc : `Descrição não disponível`}`,
		custom_fields: [
			_.apps(...apps),
			_.providers(..._providers),
		].concat(hasIntercom ? [_.translate(name)] : [] as any)
	}
}

const extracted: Record<any, Pick<ClickUp.Task.Request, 'name' | 'custom_fields'>> = {
	app_install: _ext("app_install", 'Instalou o App', ['Google Analytics'], ['App *']),
	optional_registration: _ext("optional_registration", 'Cadastro Opcional', ['Google Analytics', 'Intercom'], ['App Cliente']),
	class_extend_time: _ext("class_extend_time", 'Estendeu tempo de aula', ['Google Analytics', 'Intercom'], ['App Cliente']),
	cancel_request: _ext("cancel_request", 'Cancelou Pedido', ['Google Analytics', 'Intercom'], ['App Cliente']),
	plan_request_tutor_change: _ext("plan_request_tutor_change", 'Solicitou Alteração do Tutor no Plano', ['Google Analytics', 'Intercom'], ['App Cliente']),
	report_unforeseen: _ext("report_unforeseen", 'Relatou imprevisto', ['Google Analytics'], ['App *']),
	sign_up: _ext("sign_up", 'Cadastro Obrigatório', ['Google Analytics'], ['App *']),
	screen_view: _ext("screen_view", 'Visitou tela do App', ['Google Analytics', 'Intercom'], ['App *']),
	family_add: _ext("family_add", 'Adicionou Familiar', ['Google Analytics'], ['App Cliente']),
	family_link: _ext("family_link", 'Vinculou Familiar', ['Google Analytics', 'Intercom'], ['App Cliente']),

	purchase_flux_start: _ext("purchase_flux_start", 'Iniciou Fluxo de Compra', ['Google Analytics', 'Intercom'], ['App Cliente']),
	class_add: _ext("class_add", 'Adicionou aula', ['Google Analytics'], ['App Cliente']),
	class_delete: _ext("class_delete", 'Excluiu aula', ['Google Analytics'], ['App Cliente']),
	select_subject: _ext("select_subject", 'Selecionou Disciplina', ['Google Analytics'], ['App Cliente']),
	plan_define_duration: _ext("plan_define_duration", 'Definiu duração do Plano', ['Google Analytics'], ['App Cliente']),
	plan_define_frequency: _ext("plan_define_frequency", 'Definiu periodicidade do Plano', ['Google Analytics'], ['App Cliente']),
	open_calendar: _ext("open_calendar", 'Abriu Calendário', ['Google Analytics'], ['App Cliente']),
	complete_schedule_selection: _ext("complete_schedule_selection", 'Concluiu Seleção de Horário', ['Google Analytics'], ['App Cliente']),
	use_coupon_on_flux: _ext("use_coupon_on_flux", 'Usou Cupom no Fluxo', ['Google Analytics', 'Intercom'], ['App Cliente']),
	use_credits_on_flux: _ext("use_credits_on_flux", 'Usou Créditos no Fluxo', ['Google Analytics', 'Intercom'], ['App Cliente']),
	purchase_flux_abandon: _ext("purchase_flux_abandon", 'Abandonou Compra', ['Google Analytics', 'Intercom'], ['App Cliente']),
	purchase_flux_complete: _ext("purchase_flux_complete", 'Realizou Compra', ['Google Analytics', 'Intercom'], ['App Cliente']),

	tutor_accept_request: _ext("tutor_accept_request", 'Tutor aceitou o Pedido', ['Google Analytics', 'Intercom'], ['App Tutor']),
	interact_with_app_simulator: _ext("interact_with_app_simulator", 'Interagiu com o Simulador do App', ['Google Analytics', 'Intercom'], ['App Cliente']),
	share_coupon_code: _ext("share_coupon_code", 'Compartilhou código de desconto', ['Google Analytics', 'Intercom'], ['App *']),

	class_reschedule_request: _ext("class_reschedule_request", 'Solicitou reagendamento de aula', ['Google Analytics'], ['App Cliente']),
	class_reschedule_complete: _ext("class_reschedule_complete", 'Remarcou aula', ['Google Analytics'], ['App Cliente']),
	class_start: _ext("class_start", 'Iniciou aula', ['Google Analytics'], ['App Tutor']),
	class_trigger_support: _ext("class_trigger_support", 'Acionou o suporte durante aula', ['Google Analytics', 'Intercom'], ['App *']),
	class_end: _ext("class_end", 'Encerrou aula', ['Google Analytics', 'Intercom'], ['App Tutor']),
	give_standard_feedback: _ext("give_standard_feedback", 'Deu Feedback Padrão (pós-aula)', ['Google Analytics', 'Intercom'], ['App Cliente']),
	uninstall_app: _ext("uninstall_app", 'Desinstalou o App', ['Google Analytics', 'Intercom'], ['App *']),
	plan_complete: _ext("plan_complete", 'Concluiu Plano', ['Google Analytics', 'Intercom'], ['App Cliente']),
	add_availability: _ext("add_availability", 'Adicionou Disponibilidade', ['Intercom'], ['App Tutor']),
}

export default Object.entries(extracted);