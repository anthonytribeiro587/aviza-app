import { Download, Filter } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { historyRows } from "@/lib/mock-data";

export default function HistoryPage() {
  return <div className="page-stack">
    <PageHeader title="Histórico de envios" description="Veja o resultado de cada execução e identifique falhas rapidamente." action={<button className="secondary-button"><Download size={16} /> Exportar</button>} />
    <section className="stats-grid history-stats"><article className="mini-stat"><span>Enviadas</span><strong>148</strong><small>no mês atual</small></article><article className="mini-stat"><span>Entregues</span><strong>145</strong><small>98% de sucesso</small></article><article className="mini-stat"><span>Falhas</span><strong>3</strong><small>2 precisam de atenção</small></article></section>
    <section className="panel table-panel"><div className="table-toolbar"><div className="segmented-control"><button className="selected">Todos</button><button>Entregues</button><button>Falhas</button></div><button className="secondary-button"><Filter size={16} /> Filtros</button></div><div className="table-wrap"><table className="data-table roomy"><thead><tr><th>Data</th><th>Automação</th><th>Público</th><th>Entregues</th><th>Resultado</th></tr></thead><tbody>{historyRows.map((row) => <tr key={`${row.date}-${row.automation}`}><td>{row.date}</td><td><strong>{row.automation}</strong></td><td>{row.audience}</td><td>{row.delivered}</td><td><StatusPill>{row.result}</StatusPill></td></tr>)}</tbody></table></div></section>
  </div>;
}
