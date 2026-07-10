interface StatCardProps {
  label: string;
  value: string;
  change: string;
  tone: "blue" | "violet" | "green" | "orange";
}

export function StatCard({ label, value, change, tone }: StatCardProps) {
  return <article className="stat-card"><div className={`stat-accent ${tone}`} /><span className="stat-label">{label}</span><div className="stat-bottom"><strong>{value}</strong><span>{change}</span></div></article>;
}
