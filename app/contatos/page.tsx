import { Download, Plus, Search, Upload } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { contacts } from "@/lib/mock-data";

export default function ContactsPage() {
  return <div className="page-stack">
    <PageHeader title="Contatos" description="Cadastre pessoas, datas importantes e os grupos aos quais pertencem." action={<button className="primary-button" type="button"><Plus size={17} /> Novo contato</button>} />
    <section className="panel table-panel">
      <div className="table-toolbar"><label className="inline-search"><Search size={16} /><input placeholder="Buscar por nome ou telefone" /></label><div className="toolbar-actions"><button className="secondary-button"><Upload size={16} /> Importar</button><button className="secondary-button"><Download size={16} /> Exportar</button></div></div>
      <div className="table-wrap"><table className="data-table roomy"><thead><tr><th>Contato</th><th>Telefone</th><th>Aniversário</th><th>Grupos</th><th>Status</th></tr></thead><tbody>{contacts.map((contact) => <tr key={contact.phone}><td><div className="contact-cell"><span className="contact-avatar">{contact.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><strong>{contact.name}</strong></div></td><td>{contact.phone}</td><td>{contact.birth}</td><td>{contact.groups}</td><td><StatusPill>{contact.status}</StatusPill></td></tr>)}</tbody></table></div>
    </section>
  </div>;
}
