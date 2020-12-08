import _, { Keys, Apps, Prov } from './help'


const descriptions: Record<Keys, string> = {
	app_install: ``,
	optional_registration: ``,
	class_extend_time: ``,
	cancel_request: ``,
	plan_request_tutor_change: ``,
	report_unforeseen: ``,
	sign_up: `Cadastro Obrigatório
	Monitorado por: Google Analytics
	Nome do evento: sign_up
	Parâmetros:
	{
	  createdAt: string; // Timestamp
	  method: string;
	  userRole: 'guardian' | 'student' | 'coach';
	}`,
	screen_view: `Visitou tela do App
	Monitorado por: Google Analytics
	Nome do evento:  screen_view
	Parâmetros:
	{
	  screenName: string;
	  start: string; // Timestamp
	  end: string; // Timestamp
	  duration: number;
	}
	`,
	family_add: `Adicionou Familiar
	Monitorado por: Google Analytics
	Nome do evento: family_add
	Parâmetros:
	{
	  name: string;
	  kinship: KinshipOption; 
	  degreeLevel: string;
	  degree: DegreeOption;
	  studentId: string; // É o uuid do Estudante, não o uuid do Usuário
	  guardianId: string; // É o uuid do Responsável, não o uuid do Usuário
	  createdAt: string; // Timestamp
	}
	
	Monitorado por: Intercom
	Nome do evento: Adicionou Familiar
	Parâmetros:
	{
	  Parentesco: string;
	  Nome: string;
	  "Nível de Ensino": string;
	  Ano/Período: {
		Tipo: string; // Período ou Ano
		Valor: string;
	  };
	  "Student UUID": string; // Uuid do Aluno, não o Uuid do Usuário
	  "Guardian UUID": string; // Uuid do Responsável, não o Uuid do Usuário
	  created_at: string; // Timestamp - Padrão de um evento Intercom
	}`,
	family_link: `Vinculou Familiar
	Monitorado por: Google Analytics
	Nome do evento: family_link
	Parâmetros:
	{
	  name: string;
	  studentId: string; // Uuid do Aluno, não o Uuid do Usuário
	  guardianId: string; // Uuid do Responsável, não o Uuid do Usuário
	  degreeLevel: string;
	  degree: {
		kind: string; // Período ou Ano
		value: DegreeOption;
	  };
	  kinship: KinshipOption;
	  created_at: string; // Timestamp - Padrão de um evento Intercom
	}
	
	Monitorado por: Intercom
	Nome do evento: Familiar se Vinculou
	Parâmetros:
	{
	  "Student UUID": string; // Uuid do Aluno, não o Uuid do Usuário
	  "Guardian UUID": string; // Uuid do Responsável, não o Uuid do Usuário
	  Nome: string;
	  "Nível de Ensino": string;
	  Ano/Período: {
		  Tipo: string
		  Valor: string
	  }
	  Parentesco: string
	}`,
	purchase_flux_start: `Iniciou Fluxo de Compra
	Monitorado por: Google Analytics
	Nome do evento: purchase_flux_start
	Parâmetros:
	{
	  flux: 'single' | 'premiumPlan' | 'recommendedPlan';
	  createdAt: string; // Timestamp
	}
	
	Monitorado por: Intercom
	Nome do evento: Iniciou Fluxo de Compra
	Parâmetros:
	{
	  Fluxo: 'Aula Avulsa' | 'Plano Premium' | 'Plano Recomendado';
	  createdAt: string; // Timestamp
	}
	`,
	class_add: `Adicionou aula (Fluxo de Planos)
	Monitorado por: Google Analytics
	Nome do evento: class_add
	Parâmetros:
	{
	  flux: string;
	  createdAt: string; // Timestamp
	}
	`,
	class_delete: `Excluiu aula (Fluxo de Planos)
	Monitorado por: Google Analytics
	Nome do evento: class_delete
	Parâmetros:
	{
	  flux: string;
	  createdAt: string; // Timestamp
	}`,
	select_subject: `Selecionou Disciplina
	Monitorado por: Google Analytics
	Nome do evento: select_subject
	Parâmetros:
	{
	  flux: string;
	  subjectId: string;
	  subjectName: string;
	  createdAt: string; // Timestamp
	}
	`,
	plan_define_duration: `Definiu duração do Plano
	Monitorado por: Google Analytics
	Nome do evento: plan_define_duration
	Parâmetros:
	{
	  flux: string;
	  start: string;
	  end: string;
	  duration: number; // weeks
	  createdAt: string; // Timestamp
	}`,
	plan_define_frequency: `
	Definiu periodicidade do Plano
	Monitorado por: Google Analytics
	Nome do evento: plan_define_frequency
	Parâmetros:
	{
	  flux: string;
	  frequency: number;
	  createdAt: string; // Timestamp
	}`,
	open_calendar: `Abriu Calendário
	Monitorado por: Google Analytics
	Nome do evento: open_calendar
	Parâmetros:
	{
	  flux: string;
	  createdAt: string; // Timestamp
	}`,
	complete_schedule_selection: `Concluiu Seleção de Horário
	Monitorado por: Google Analytics
	Nome do evento: complete_schedule_selection
	Parâmetros:
	{
	  flux: string;
	  selectedDateTime: string;
	  createdAt: string; // Timestamp
	}`,
	use_coupon_on_flux: `Usou Cupom no Fluxo
	Monitorado por: Google Analytics e Intercom
	Nome do evento:
		Firebase: use_coupon_on_flux
		Intercom: Usou Cupom no Fluxo
	Parâmetros:
	{
	  flux: string;
	  coupon: string; (código)
	  discount: number;
	  createdAt: string; // Timestamp
	}`,
	use_credits_on_flux: `Usou Créditos no Fluxo
	Monitorado por: Google Analytics e Intercom
	Nome do evento:
		Firebase: use_credits_on_flux
		Intercom: Usou Créditos no Fluxo
	Parâmetros:
	{
	  flux: string;
	  value: number;
	  createdAt: string; // Timestamp
	}`,
	purchase_flux_abandon: `Abandonou Compra
	Monitorado por: Google Analytics e Intercom
	Nome do evento:
		Firebase: purchase_flux_abandon
		Intercom: Abandonou Compra
	Parâmetros:
	{
	  flux: string;
	  subjects: string[];
	  value: number;
	  createdAt: string; //Timestamp
	}`,
	purchase_flux_complete: `Realizou Compra
	Monitorado por: Google Analytics
	Nome do evento: purchase_flux_complete
	Parâmetros:
	{
	  flux: string;
	  subjects: string[];
	  value: number;
	  createdAt: string; //Timestamp
	}
	
	Monitorado por: Intercom
	Nome do evento: Realizou Compra
	Parâmetros:
	{
	  Fluxo: string;
	  Disciplinas: string[];
	  Valor: number;
	  "Criado em": string; //Timestamp
	}
	`,
	tutor_accept_request: `Tutor aceitou o Pedido
	Monitorado por: Google Analytics
	Nome do evento: tutor_accept_request
	Parâmetros:
	{
	  requestId: string;
	  createdAt: string; // Timestamp
	}
	
	Monitorado por: Intercom
	Nome do evento: Tutor aceitou o Pedido
	Parâmetros:
	{
	  "Request UUID": string;
	  "Criado em": string; // Timestamp
	}
	`,
	interact_with_app_simulator: `Interagiu com o Simulador do App
	Monitorado por: Intercom
	Nome do evento: Interagiu com Simulador do App
	Parâmetros:
	{
	  "Início da Interação": string; // Timestamp
	  "Fim da Interação": string; // Timestamp
	  "Duração da Interação": number;
	  "Valores simulados": number[];
	}
	`,
	share_coupon_code: `Compartilhou Código de Desconto
	Monitorado por: Intercom
	Nome do evento: Compartilhou Código de Desconto
	Parâmetros:
	{
	  "Criado em": string; // Timestamp
	  Cupom: string; (código)
	}`,
	class_reschedule_request: `Solicitou Reagendamento de aula
	Monitorado por: Intercom
	Nome do evento: Solicitou Reagendamento de Aula
	Parâmetros:
	{
	  Tipo: 'punctual' | 'fixed';
	  "Criado em": string; // Timestamp
	  "Data Anterior": string; // Timestamp
	  "Data Nova": string; // Timestamp
	}
	
	Remarcou aula 
	Monitorado por: Intercom
	Nome do evento: Remarcou Aula
	Parâmetros:
	{
	  Tipo: 'punctual' | 'fixed';
	  "Criado em": string; // Timestamp
	  "Data Anterior": string; // Timestamp
	  "Data Nova": string; // Timestamp
	}
	`,
	class_reschedule_complete: ``,
	class_start: `Iniciou Aula
	Monitorado por: Google Analytics
	Nome do evento: class_start
	Parâmetros:
	{
	  date: string; // Timestamp
	  sessionId: string;
	  subjectId: string;
	  subjectName: string;
	  expectedDuration: string;
	  studentId: string; // Uuid do Aluno, não o Uuid do Usuário
	  coachId: string; // Uuid do Tutor, não o Uuid do Usuário
	}`,
	class_trigger_support: `Acionou Suporte durante a Aula
	Monitorado por: Google Analytics
	Nome do evento: class_trigger_support
	Parâmetros:
	{
	  sessionId: string;
	  createdAt: string; // Timestamp;
	}
	
	Monitorado por: Intercom
	Nome do evento: Acionou Suporte durante a Aula
	Parâmetros:
	{
	  "Session UUID": string;
	  "Criado em": string; // Timestamp
	}`,
	class_end: `Encerrou aula
	Monitorado por: Intercom
	Nome do evento: Encerrou Aula
	Parâmetros:
	{
	  "Data e Hora": string; // Timestamp
	  "UUID da Disciplina": string;
	  "Nome da Disciplina": string;
	  "Duração Real": string;
	  "UUID do Aluno": string;
	  "UUID do Coach": string;
	  Valor: string;
	}`,
	give_standard_feedback: `Deu Feedback Padrão
	Monitorado por: Google Analytics
	Nome do evento: give_standard_feedback
	Parâmetros:
	{
	  subjectName: string;
	  subjectId: string;
	  studentId: string;
	  coachId: string;
	  comments: string;
	  ...ratings
	}
	
	Monitorado por: Intercom
	Nome do evento: Deu Feedback Padrão
	Parâmetros:
	{
	  "Nome da Disciplina": string;
	  "UUID da Disciplina": string;
	  "UUID do Aluno": string;
	  "UUID do Tutor": string;
	  "Comentários": string;
	  ...ratings
	}
	
	OBS: Atualmente ratings é um objeto, onde a chave é uma categoria e o valor é a nota. Dessa forma, damos spread nesse objeto nos parâmetros do evento, para que mantenhamos apenas chaves com valores primitivos.
	Atuais categorias: general, comprehension, interest e knowledge
	Para o caso do intercom essas categorias serão traduzidas para o português, conforme a seguir: geral, compreensão, interesse e conhecimento
	`,
	uninstall_app: ``,
	plan_complete: `Concluiu o Plano
	Monitorado por: Google Analytics
	Nome do evento: plan_complete
	Parâmetros:
	{
	  requestId: string;
	  dateTime: string; // Timestamp
	  studentId: string;
	  coachId: string;
	}
	
	Monitorado por: Intercom
	Nome do evento: Concluiu o Plano
	Parâmetros:
	{
	  "UUID do Request": string;
	  "Data e Hora": string; // Timestamp
	  "UUID do Aluno": string;
	  "UUID do Tutor": string;
	}
	
	Adicionou Disponibilidade 
	Monitorado por: Intercom
	Nome do evento: Adicionou Disponibilidade
	Parâmetros:
	{
	  "UUID do Tutor": string;
	}`,
	add_availability: ``,
}


export default descriptions;