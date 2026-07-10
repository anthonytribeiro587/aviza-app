import { Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ReminderBuilder } from "@/components/reminder-builder";
import { StatusPill } from "@/components/status-pill";
import { reminderList } from "@/lib/mock-data";

export default function RemindersPage() {
  return <div className="page-stack">
    <PageHeader title="Lembretes" description="Crie avisos recorrentes ou mensagens programadas para qualquer grupo." action={<button className="primary-button" type="button"><Plus size={17} /> Novo lembrete</button>} />
    <section className="panel table-panel"><div className="panel-header"><div><h2>Automações cadastradas</h2><p>Gerencie o que já está programado.</p></div></div><div className="table-wrap"><table className="data-table roomy"><thead><tr><th>Nome</th><th>Público</th><th>Frequência</th><th>Última execução</th><th>Status</th></tr></thead><tbody>{reminderList.map((item) => <tr key={item.name}><td><strong>{item.name}</strong></td><td>{item.audience}</td><td>{item.frequency}</td><td>{item.lastRun}</td><td><StatusPill>{item.status}</StatusPill></td></tr>)}</tbody></table></div></section>
    <div className="section-divider"><span>CRIAR NOVO LEMBRETE</span></div>
    <ReminderBuilder />
  </div>;
}
