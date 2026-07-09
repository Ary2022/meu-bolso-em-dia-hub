import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard, Receipt, Target, PieChart, CreditCard, ShieldCheck,
  FileBarChart, Sparkles, User, Settings, LogOut, Menu, X, Plus, Wallet, Download,
} from "lucide-react";
import { InstallPWA } from "./InstallPWA";

type NavItem = { to: string; label: string; icon: React.ComponentType<{ className?: string }>; mobile?: boolean };

const NAV: NavItem[] = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard, mobile: true },
  { to: "/app/lancamentos", label: "Lançar", icon: Receipt, mobile: true },
  { to: "/app/metas", label: "Metas", icon: Target, mobile: true },
  { to: "/app/orcamentos", label: "Orçamentos", icon: PieChart },
  { to: "/app/dividas", label: "Dívidas", icon: CreditCard },
  { to: "/app/reserva", label: "Reserva", icon: ShieldCheck },
  { to: "/app/relatorios", label: "Relatórios", icon: FileBarChart, mobile: true },
  { to: "/app/consultor-ia", label: "IA", icon: Sparkles, mobile: true },
  { to: "/app/perfil", label: "Perfil", icon: User },
  { to: "/app/configuracoes", label: "Configurações", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const nav = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  async function signOut() {
    await supabase.auth.signOut();
    nav({ to: "/login", replace: true });
  }

  const isActive = (to: string) => pathname === to || pathname.startsWith(to + "/");
  const mobileItems = NAV.filter((n) => n.mobile);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex" data-app-shell>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="p-5 border-b border-white/10">
          <Link to="/app/dashboard" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl grid place-items-center bg-[#63FF3B]/15 border border-[#63FF3B]/40">
              <Wallet className="h-4 w-4 text-[#63FF3B]" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">Meu Bolso em Dia</p>
              <p className="text-[10px] uppercase tracking-widest text-[#63FF3B]">IA</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = isActive(n.to);
            return (
              <Link key={n.to} to={n.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  active ? "bg-[#63FF3B]/15 text-[#63FF3B] font-semibold border border-[#63FF3B]/30"
                         : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}>
                <Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-2">
          <InstallPWA />
          <button onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:bg-white/5 hover:text-white">
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar mobile */}
        <header className="lg:hidden sticky top-0 z-30 border-b border-white/10 bg-black/70 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 h-14">
            <Link to="/app/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg grid place-items-center bg-[#63FF3B]/15 border border-[#63FF3B]/40">
                <Wallet className="h-4 w-4 text-[#63FF3B]" />
              </div>
              <span className="font-bold text-sm">Meu Bolso em Dia IA</span>
            </Link>
            <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg hover:bg-white/5">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 pb-24 lg:pb-6 overflow-x-hidden">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-white/10 bg-black/85 backdrop-blur-xl">
          <div className="grid grid-cols-5">
            {mobileItems.map((n) => {
              const Icon = n.icon;
              const active = isActive(n.to);
              return (
                <Link key={n.to} to={n.to}
                  className={`flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
                    active ? "text-[#63FF3B]" : "text-white/60"
                  }`}>
                  <Icon className="h-5 w-5" />
                  {n.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur" onClick={() => setMobileOpen(false)}>
          <aside className="absolute right-0 top-0 h-full w-72 bg-[#0B0B0B] border-l border-white/10 p-5"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold">Menu</span>
              <button onClick={() => setMobileOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <nav className="space-y-1">
              {NAV.map((n) => {
                const Icon = n.icon;
                const active = isActive(n.to);
                return (
                  <Link key={n.to} to={n.to}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${
                      active ? "bg-[#63FF3B]/15 text-[#63FF3B]" : "text-white/80 hover:bg-white/5"
                    }`}>
                    <Icon className="h-4 w-4" /> {n.label}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-white/10 mt-3 space-y-2">
                <InstallPWA />
                <button onClick={signOut}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:bg-white/5">
                  <LogOut className="h-4 w-4" /> Sair
                </button>
              </div>
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-white/60 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function AddButton({ onClick, label = "Adicionar" }: { onClick: () => void; label?: string }) {
  return (
    <button onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-[#63FF3B] px-4 py-2 text-sm font-bold text-black hover:bg-[#63FF3B]/90 transition">
      <Plus className="h-4 w-4" /> {label}
    </button>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 ${className}`}>
      {children}
    </div>
  );
}

export { Download };
