export const stats = [
  { label: "Mensagens no mês", value: "148", change: "+18%", tone: "blue" },
  { label: "Automações ativas", value: "6", change: "2 pausadas", tone: "violet" },
  { label: "Grupos conectados", value: "4", change: "382 pessoas", tone: "green" },
  { label: "Falhas de envio", value: "2", change: "1,3% do total", tone: "orange" },
] as const;

export const upcomingReminders = [
  { title: "Aniversariantes do dia", group: "Comunidade Geral", schedule: "Hoje, 08:00", type: "Aniversário", status: "Agendado" },
  { title: "Ensaio do louvor", group: "Equipe de Louvor", schedule: "Hoje, 18:30", type: "Semanal", status: "Agendado" },
  { title: "Encontro dos jovens", group: "Jovens Conectados", schedule: "Sexta, 10:00", type: "Semanal", status: "Agendado" },
  { title: "Reunião de liderança", group: "Liderança", schedule: "Domingo, 16:00", type: "Mensal", status: "Rascunho" },
];

export const groups = [
  { name: "Comunidade Geral", people: 187, automations: 2, status: "Ativo", initials: "CG" },
  { name: "Equipe de Louvor", people: 34, automations: 2, status: "Ativo", initials: "EL" },
  { name: "Jovens Conectados", people: 96, automations: 1, status: "Ativo", initials: "JC" },
  { name: "Liderança", people: 65, automations: 1, status: "Pausado", initials: "LI" },
];

export const activity = [
  { title: "Mensagem enviada", detail: "Ensaio do louvor · 34 destinatários", time: "há 18 min", status: "success" },
  { title: "Contato atualizado", detail: "Nascimento de Mariana Alves", time: "há 1 h", status: "neutral" },
  { title: "Envio com falha", detail: "2 números sem WhatsApp válido", time: "há 3 h", status: "danger" },
  { title: "Automação criada", detail: "Encontro dos jovens", time: "ontem", status: "neutral" },
];

export const contacts = [
  { name: "Mariana Alves", phone: "+55 51 99999-1001", birth: "12 jul", groups: "Comunidade Geral", status: "Ativo" },
  { name: "Gabriel Lima", phone: "+55 51 99999-1002", birth: "23 ago", groups: "Louvor, Liderança", status: "Ativo" },
  { name: "Eduardo Martins", phone: "+55 51 99999-1003", birth: "04 set", groups: "Louvor", status: "Ativo" },
  { name: "Lais Oliveira", phone: "+55 51 99999-1004", birth: "19 out", groups: "Jovens", status: "Ativo" },
  { name: "Bruna Ribeiro", phone: "+55 51 99999-1005", birth: "28 nov", groups: "Comunidade Geral", status: "Inativo" },
];

export const reminderList = [
  { name: "Aniversariantes do dia", audience: "Todos os grupos", frequency: "Todos os dias · 08:00", status: "Ativo", lastRun: "Hoje, 08:00" },
  { name: "Ensaio do louvor", audience: "Equipe de Louvor", frequency: "Toda quinta · 18:30", status: "Ativo", lastRun: "Ontem, 18:30" },
  { name: "Encontro dos jovens", audience: "Jovens Conectados", frequency: "Toda sexta · 10:00", status: "Ativo", lastRun: "04 jul, 10:00" },
  { name: "Reunião de liderança", audience: "Liderança", frequency: "1º domingo · 16:00", status: "Rascunho", lastRun: "Nunca" },
];

export const historyRows = [
  { date: "10 jul · 08:00", automation: "Aniversariantes do dia", audience: "3 contatos", result: "Entregue", delivered: "3/3" },
  { date: "09 jul · 18:30", automation: "Ensaio do louvor", audience: "Equipe de Louvor", result: "Entregue", delivered: "34/34" },
  { date: "08 jul · 08:00", automation: "Aniversariantes do dia", audience: "1 contato", result: "Falha parcial", delivered: "0/1" },
  { date: "04 jul · 10:00", automation: "Encontro dos jovens", audience: "Jovens Conectados", result: "Entregue", delivered: "94/96" },
];
