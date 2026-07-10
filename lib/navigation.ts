import {
  BellRing,
  ContactRound,
  History,
  LayoutDashboard,
  Settings,
  UsersRound,
} from "lucide-react";

export const navigation = [
  { label: "Visão geral", href: "/dashboard", icon: LayoutDashboard },
  { label: "Grupos", href: "/grupos", icon: UsersRound },
  { label: "Contatos", href: "/contatos", icon: ContactRound },
  { label: "Lembretes", href: "/lembretes", icon: BellRing },
  { label: "Histórico", href: "/historico", icon: History },
  { label: "Configurações", href: "/configuracoes", icon: Settings },
] as const;
