import { Check, PlugZap, Save, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function SettingsPage() {
  return <div className="page-stack">
    <PageHeader title="Configurações" description="Gerencie o espaço, preferências de envio e integrações." />
    <div className="settings-grid">
      <aside className="settings-nav panel-flat"><button className="selected">Geral</button><button>WhatsApp</button><button>Equipe</button><button>Segurança</button></aside>
      <div className="settings-content">
        <section className="panel settings-section"><div className="panel-header"><div><h2>Informações do espaço</h2><p>Esses dados identificam sua conta no Aviza.</p></div></div><div className="form-grid two-cols"><label className="field"><span>Nome do espaço</span><input defaultValue="Meu espaço" /></label><label className="field"><span>Fuso horário</span><select defaultValue="America/Sao_Paulo"><option value="America/Sao_Paulo">Brasília (GMT-3)</option></select></label></div><label className="field"><span>Descrição</span><textarea rows={3} defaultValue="Central de comunicação e lembretes." /></label><div className="settings-footer"><button className="primary-button"><Save size={16} /> Salvar alterações</button></div></section>
        <section className="panel integration-panel"><div className="integration-icon"><PlugZap size={22} /></div><div className="integration-copy"><div><span className="eyebrow">INTEGRAÇÃO</span><h2>Evolution API</h2></div><p>A instância do WhatsApp será conectada depois que o painel e o banco estiverem validados.</p><div className="integration-checks"><span><Check size={14} /> Estrutura preparada</span><span><Check size={14} /> Variáveis de ambiente definidas</span></div></div><button className="secondary-button" disabled>Conectar depois</button></section>
        <section className="panel security-note"><ShieldCheck size={21} /><div><h3>Dados separados por organização</h3><p>A estrutura do Supabase usa organização e políticas RLS para impedir que dados de um cliente apareçam para outro.</p></div></section>
      </div>
    </div>
  </div>;
}
