import { useEffect, useState } from "react";
import { Download, Smartphone, X } from "lucide-react";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallPWA() {
  const [prompt, setPrompt] = useState<BIPEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [showIosHint, setShowIosHint] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);
    setIsIOS(ios);
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setInstalled(standalone);

    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BIPEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setInstalled(true));
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (installed) return null;

  async function handleClick() {
    if (isIOS) {
      setShowIosHint(true);
      return;
    }
    if (prompt) {
      await prompt.prompt();
      const res = await prompt.userChoice;
      if (res.outcome === "accepted") setPrompt(null);
    } else {
      setShowIosHint(true);
    }
  }

  return (
    <>
      <button onClick={handleClick}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#63FF3B] hover:bg-[#63FF3B]/10 border border-[#63FF3B]/30">
        <Download className="h-4 w-4" /> Instalar App
      </button>
      {showIosHint && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur flex items-end sm:items-center justify-center p-4"
          onClick={() => setShowIosHint(false)}>
          <div className="w-full max-w-md rounded-3xl bg-[#0B0B0B] border border-white/10 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Smartphone className="h-6 w-6 text-[#63FF3B]" />
                <h3 className="font-bold text-lg">Instalar no seu dispositivo</h3>
              </div>
              <button onClick={() => setShowIosHint(false)}><X className="h-5 w-5" /></button>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              {isIOS
                ? "Abra este site no Safari, toque no botão Compartilhar e depois em Adicionar à Tela de Início."
                : "Seu navegador não ofereceu o prompt automático. No menu do navegador, procure por Instalar app ou Adicionar à tela inicial."}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
