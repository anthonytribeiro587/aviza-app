import { MoreHorizontal, Plus, Send, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { groups } from "@/lib/mock-data";

export default function GroupsPage() {
  return <div className="page-stack">
    <PageHeader title="Grupos" description="Organize os públicos que receberão mensagens e lembretes." action={<button className="primary-button" type="button"><Plus size={17} /> Novo grupo</button>} />
    <div className="toolbar panel-flat"><div className="segmented-control"><button className="selected">Todos</button><button>Ativos</button><button>Pausados</button></div><div className="toolbar-copy">4 grupos · 382 pessoas</div></div>
    <section className="group-grid">{groups.map((group) => <article className="group-card detailed" key={group.name}><div className="group-top"><span className="group-avatar large">{group.initials}</span><button className="ghost-icon" type="button" aria-label={`Opções de ${group.name}`}><MoreHorizontal size={19} /></button></div><div className="group-title-row"><h2>{group.name}</h2><StatusPill>{group.status}</StatusPill></div><p>Mensagens, avisos e lembretes direcionados para este público.</p><div className="group-meta cards"><span><UsersRound size={16} /><strong>{group.people}</strong> pessoas</span><span><Send size={16} /><strong>{group.automations}</strong> automações</span></div><button className="secondary-button full" type="button">Abrir grupo</button></article>)}</section>
  </div>;
}
