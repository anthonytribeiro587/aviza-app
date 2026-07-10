interface StatusPillProps { children: string; }

export function StatusPill({ children }: StatusPillProps) {
  const normalized = children.toLowerCase();
  let tone = "neutral";
  if (["ativo", "agendado", "entregue"].some((item) => normalized.includes(item))) tone = "success";
  if (["falha", "inativo"].some((item) => normalized.includes(item))) tone = "danger";
  if (["rascunho", "pausado"].some((item) => normalized.includes(item))) tone = "warning";
  return <span className={`status-pill ${tone}`}>{children}</span>;
}
