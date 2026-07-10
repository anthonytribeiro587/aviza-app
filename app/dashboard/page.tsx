import Link from "next/link";
import { ArrowRight, CalendarClock, CheckCircle2, CircleAlert, Clock3, Plus, Send, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { StatusPill } from "@/components/status-pill";
import { activity, groups, stats, upcomingReminders } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="page-stack">
      <PageHeader eyebrow="SEXTA-FEIRA, 10 DE JULHO" title="Visão geral" description="Acompanhe os próximos envios e tudo que está acontecendo no seu espaço." action={<Link href="/lembretes" className="primary-button"><Plus size={17} /> Novo lembrete</Link>} />
      <section className="stats-grid" aria-label="Indicadores">{stats.map((item) => <StatCard key={item.label} {...item} />)}</section>
      <section className="dashboard-grid">
        <div className="panel panel-wide">
          <div className="panel-header"><div><h2>Próximos envios</h2><p>Lembretes programados para os próximos dias.</p></div><Link href="/lembretes" className="text-link">Ver todos <ArrowRight size={15} /></Link></div>
          <div className="table-wrap"><table className="data-table"><thead><tr><th>Lembrete</th><th>Grupo</th><th>Quando</th><th>Status</th></tr></thead><tbody>{upcomingReminders.map((item) => <tr key={item.title}><td><div className="table-primary"><span className="table-icon"><CalendarClock size={16} /></span><div><strong>{item.title}</strong><span>{item.type}</span></div></div></td><td>{item.group}</td><td>{item.schedule}</td><td><StatusPill>{item.status}</StatusPill></td></tr>)}</tbody></table></div>
        </div>
        <div className="panel activity-panel">
          <div className="panel-header"><div><h2>Atividade recente</h2><p>Últimas movimentações.</p></div></div>
          <div className="activity-list">{activity.map((item) => { const Icon = item.status === "success" ? CheckCircle2 : item.status === "danger" ? CircleAlert : Clock3; return <div className="activity-item" key={`${item.title}-${item.time}`}><span className={`activity-icon ${item.status}`}><Icon size={16} /></span><div className="activity-copy"><strong>{item.title}</strong><span>{item.detail}</span></div><time>{item.time}</time></div>; })}</div>
        </div>
      </section>
      <section className="panel">
        <div className="panel-header"><div><h2>Grupos acompanhados</h2><p>Uma visão rápida dos públicos cadastrados.</p></div><Link href="/grupos" className="text-link">Gerenciar grupos <ArrowRight size={15} /></Link></div>
        <div className="group-grid compact">{groups.map((group) => <article className="group-card" key={group.name}><div className="group-top"><span className="group-avatar">{group.initials}</span><StatusPill>{group.status}</StatusPill></div><h3>{group.name}</h3><div className="group-meta"><span><UsersRound size={15} /> {group.people} pessoas</span><span><Send size={15} /> {group.automations} automações</span></div></article>)}</div>
      </section>
    </div>
  );
}
