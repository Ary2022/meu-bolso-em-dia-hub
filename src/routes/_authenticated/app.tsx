import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/app/AppShell";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Meu Bolso em Dia IA" },
      { name: "robots", content: "noindex" },
      { name: "theme-color", content: "#0B0B0B" },
    ],
  }),
  component: AppLayout,
});

function AppLayout() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        nav({ to: "/login", replace: true });
        return;
      }
      const { data: profile } = await supabase.from("profiles").select("onboarding_completed").eq("id", data.user.id).maybeSingle();
      if (!profile || !profile.onboarding_completed) {
        nav({ to: "/onboarding", replace: true });
        return;
      }
      setReady(true);
    })();
  }, [nav]);

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#0B0B0B] text-white">
        <Loader2 className="h-8 w-8 animate-spin text-[#63FF3B]" />
      </div>
    );
  }
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
