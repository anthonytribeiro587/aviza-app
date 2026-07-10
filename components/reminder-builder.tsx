"use client";

import { CalendarClock, MessageSquareText, Save, Send, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";

const defaultMessage = "Olá, pessoal! Passando para lembrar do nosso encontro nesta sexta-feira, às 19h. Esperamos vocês! 🙌";

export function ReminderBuilder() {
  const [name, setName] = useState("Encontro dos jovens");
  const [group, setGroup] = useState("Jovens Conectados");
  const [frequency, setFrequency] = useState("Semanal");
  const [day, setDay] = useState("Sexta-feira");
  const [time, setTime] = useState("10:00");
  const [message, setMessage] = useState(defaultMessage);
  const summary = useMemo(() => frequency === "Uma vez" ? `${day}, às ${time}` : `${frequency} · ${day}, às ${time}`, [day, frequency, time]);

  return <div className="builder-grid">
    <section className="panel builder-form">
      <div className="builder-section"><div className="builder-section-title"><span>1</span><div><h2>Informações básicas</h2><p>Defina o nome e quem receberá o aviso.</p></div></div><div className="form-grid two-cols"><label className="field"><span>Nome do lembrete</span><input value={name} onChange={(event) => setName(event.target.value)} /></label><label className="field"><span>Grupo destinatário</span><select value={group} onChange={(event) => setGroup(event.target.value)}><option>Jovens Conectados</option><option>Comunidade Geral</option><option>Equipe de Louvor</option><option>Liderança</option></select></label></div></div>
      <div className="builder-section"><div className="builder-section-title"><span>2</span><div><h2>Programação</h2><p>Escolha quando a mensagem deve ser enviada.</p></div></div><div className="form-grid three-cols"><label className="field"><span>Frequência</span><select value={frequency} onChange={(event) => setFrequency(event.target.value)}><option>Uma vez</option><option>Diário</option><option>Semanal</option><option>Mensal</option><option>Anual</option></select></label><label className="field"><span>Dia</span><select value={day} onChange={(event) => setDay(event.target.value)}><option>Segunda-feira</option><option>Terça-feira</option><option>Quarta-feira</option><option>Quinta-feira</option><option>Sexta-feira</option><option>Sábado</option><option>Domingo</option></select></label><label className="field"><span>Horário</span><input type="time" value={time} onChange={(event) => setTime(event.target.value)} /></label></div></div>
      <div className="builder-section"><div className="builder-section-title"><span>3</span><div><h2>Mensagem</h2><p>Escreva o texto que será enviado ao grupo.</p></div></div><label className="field"><span>Conteúdo</span><textarea rows={6} value={message} onChange={(event) => setMessage(event.target.value)} maxLength={1000} /><small>{message.length}/1000 caracteres</small></label><div className="variable-row"><span>Inserir variável:</span><button type="button">{"{nome}"}</button><button type="button">{"{grupo}"}</button><button type="button">{"{data}"}</button></div></div>
      <div className="builder-actions"><button className="secondary-button" type="button"><Save size={16} /> Salvar rascunho</button><button className="primary-button" type="button"><CalendarClock size={16} /> Agendar lembrete</button></div>
    </section>
    <aside className="preview-column">
      <section className="panel preview-panel"><div className="panel-header"><div><h2>Prévia do envio</h2><p>Como a mensagem aparecerá.</p></div></div><div className="phone-preview"><div className="phone-top"><span className="preview-avatar">JC</span><div><strong>{group}</strong><span>grupo do WhatsApp</span></div></div><div className="chat-area"><div className="message-bubble">{message || "Sua mensagem aparecerá aqui."}<time>10:00 ✓✓</time></div></div></div></section>
      <section className="panel summary-panel"><h3>Resumo</h3><div className="summary-row"><UsersRound size={16} /><div><span>Público</span><strong>{group}</strong></div></div><div className="summary-row"><CalendarClock size={16} /><div><span>Programação</span><strong>{summary}</strong></div></div><div className="summary-row"><MessageSquareText size={16} /><div><span>Lembrete</span><strong>{name || "Sem nome"}</strong></div></div><div className="summary-row"><Send size={16} /><div><span>Canal</span><strong>WhatsApp</strong></div></div></section>
    </aside>
  </div>;
}
