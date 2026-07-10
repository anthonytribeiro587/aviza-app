"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircleMore, PlugZap, X } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/lib/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="mobile-menu-button" type="button" aria-label="Abrir menu" onClick={() => setOpen(true)}>
        <Menu size={20} />
      </button>
      {open && <button className="sidebar-overlay" aria-label="Fechar menu" onClick={() => setOpen(false)} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <Link href="/dashboard" className="brand" onClick={() => setOpen(false)}>
            <span className="brand-mark"><MessageCircleMore size={19} strokeWidth={2.3} /></span>
            <span>Aviza</span>
          </Link>
          <button className="sidebar-close" type="button" onClick={() => setOpen(false)} aria-label="Fechar menu"><X size={19} /></button>
        </div>
        <nav className="sidebar-nav" aria-label="Navegação principal">
          <p className="nav-label">MENU</p>
          {navigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={`nav-item ${active ? "active" : ""}`} onClick={() => setOpen(false)}>
                <Icon size={18} strokeWidth={2} /><span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="connection-card">
            <div className="connection-icon"><PlugZap size={17} /></div>
            <div><strong>WhatsApp pendente</strong><span>Conectaremos na etapa final</span></div>
          </div>
          <div className="workspace-switcher">
            <div className="workspace-avatar">AR</div>
            <div className="workspace-copy"><strong>Meu espaço</strong><span>Administrador</span></div>
            <span className="workspace-dots">•••</span>
          </div>
        </div>
      </aside>
    </>
  );
}
