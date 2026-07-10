import { Bell, Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="topbar">
      <div className="search-box">
        <Search size={17} />
        <input type="search" placeholder="Buscar contatos, grupos ou lembretes..." aria-label="Buscar" />
        <kbd>⌘ K</kbd>
      </div>
      <div className="topbar-actions">
        <button className="icon-button" type="button" aria-label="Notificações"><Bell size={18} /><span className="notification-dot" /></button>
        <div className="topbar-profile"><span className="profile-avatar">AR</span><div><strong>Anthony</strong><span>Administrador</span></div></div>
      </div>
    </header>
  );
}
