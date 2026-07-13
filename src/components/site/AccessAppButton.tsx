import { useEffect, useState, type ReactNode, type CSSProperties } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Download, Smartphone, X, ArrowRight } from "lucide-react";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  to?: string;
};

/**
 * Botão "Acessar App" com instalação PWA integrada.
 * - Se o navegador suporta o prompt nativo (Chrome/Edge/Android/Windows/Mac Chrome), oferece instalar antes de entrar.
 * - Em iOS/Safari, mostra instruções de "Adicionar à Tela de Início".
 * - Se o app já estiver instalado ou o usuário dispensar, navega direto para /app.
 */
export function AccessAppButton({ children, className, style, to = "/app" }: Props) {
  const nav = useNavigate();
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop" | "other">("other");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ua = window.navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);
    const isAndroid = /Android/i.test(ua);
    const isDesktop = !isIOS && !isAndroid && /Macintosh|Windows|Linux/i.test(ua);
    setPlatform(isIOS ? "ios" : isAndroid ? "android" : isDesktop ? "desktop" : "other");

    const standalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setInstalled(standalone);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  function goToApp() {
    nav({ to });
  }

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    if (installed) {
      goToApp();
      return;
    }
    if (deferred) {
      try {
        await deferred.prompt();
        await deferred.userChoice;
      } catch {
        /* no-op */
      }
      setDeferred(null);
      goToApp();
      return;
    }
    // Sem prompt nativo disponível: abre modal com instruções por plataforma
    setShowModal(true);
  }

  return (
    <>
      <button type="button" onClick={handleClick} className={className} style={style}>
        {children}
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur flex items-end sm:items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-[#0B0B0B] text-white border border-white/10 p-6"
            onClick={(ev) => ev.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl grid place-items-center bg-[#63FF3B]/15 border border-[#63FF3B]/40">
                  {platform === "ios" ? (
                    <Smartphone className="h-5 w-5 text-[#63FF3B]" />
                  ) : (
                    <Download className="h-5 w-5 text-[#63FF3B]" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">Instalar o App</h3>
                  <p className="text-xs text-white/60">Meu Bolso em Dia IA</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} aria-label="Fechar">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-white/85 leading-relaxed">
              {platform === "ios" && (
                <ol className="list-decimal list-inside space-y-1.5">
                  <li>Abra este site no <b>Safari</b> (iPhone/iPad/Mac).</li>
                  <li>Toque no botão <b>Compartilhar</b> (ícone de seta para cima).</li>
                  <li>Escolha <b>Adicionar à Tela de Início</b>.</li>
                  <li>Confirme em <b>Adicionar</b>. Pronto — abra pelo ícone.</li>
                </ol>
              )}
              {platform === "android" && (
                <ol className="list-decimal list-inside space-y-1.5">
                  <li>Abra este site no <b>Chrome</b>.</li>
                  <li>Toque no menu <b>⋮</b> no canto superior direito.</li>
                  <li>Escolha <b>Instalar app</b> ou <b>Adicionar à tela inicial</b>.</li>
                  <li>Confirme. O app aparecerá como um ícone nativo.</li>
                </ol>
              )}
              {platform === "desktop" && (
                <ol className="list-decimal list-inside space-y-1.5">
                  <li>No <b>Chrome</b>, <b>Edge</b> ou <b>Brave</b>, clique no ícone de <b>instalar</b> na barra de endereços (símbolo de monitor com seta).</li>
                  <li>Se não aparecer, abra o menu <b>⋮</b> → <b>Instalar Meu Bolso em Dia IA</b>.</li>
                  <li>No <b>Safari (Mac)</b>: Arquivo → <b>Adicionar ao Dock</b>.</li>
                  <li>Confirme e abra pelo ícone do sistema.</li>
                </ol>
              )}
              {platform === "other" && (
                <p>
                  No menu do seu navegador, procure por <b>Instalar app</b> ou <b>Adicionar à tela inicial</b>.
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  goToApp();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#63FF3B] px-5 py-3 text-sm font-bold text-black hover:bg-[#63FF3B]/90"
              >
                Continuar para o app <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/80 hover:bg-white/5"
              >
                Depois
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
