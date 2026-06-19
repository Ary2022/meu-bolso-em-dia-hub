import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { CheckCircle2, AlertCircle } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  whatsapp: z.string().trim().max(32).optional().or(z.literal("")),
  financial_goal: z.enum(["save", "debt", "extra", "invest", "books"]).optional(),
});

export function LeadForm({ source = "landing" }: { source?: string }) {
  const { t, lang, dict } = useI18n();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      whatsapp: String(fd.get("whatsapp") || ""),
      financial_goal: (fd.get("financial_goal") as string) || undefined,
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      setStatus("error");
      setErrorMsg(parsed.error.issues[0]?.message ?? t("lead.error"));
      return;
    }
    setStatus("loading");
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      whatsapp: parsed.data.whatsapp || null,
      financial_goal: parsed.data.financial_goal ?? null,
      language: lang,
      source,
    });
    if (error) {
      console.error(error);
      setStatus("error");
      setErrorMsg(t("lead.error"));
      return;
    }
    setStatus("success");
    (e.target as HTMLFormElement).reset();
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/40 bg-accent/10 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
        <p className="mt-3 text-sm font-medium text-foreground">{t("lead.success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3" noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="name" required maxLength={120} placeholder={t("lead.name")}
          className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          name="email" type="email" required maxLength={254} placeholder={t("lead.email")}
          className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <input
        name="whatsapp" maxLength={32} placeholder={t("lead.whatsapp")}
        className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      <select
        name="financial_goal" defaultValue=""
        className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="" disabled>{t("lead.goal")}</option>
        <option value="save">{dict.lead.goals.save}</option>
        <option value="debt">{dict.lead.goals.debt}</option>
        <option value="extra">{dict.lead.goals.extra}</option>
        <option value="invest">{dict.lead.goals.invest}</option>
        <option value="books">{dict.lead.goals.books}</option>
      </select>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{errorMsg || t("lead.error")}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-1 inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 shadow-soft disabled:opacity-60"
      >
        {status === "loading" ? t("lead.sending") : t("lead.submit")}
      </button>
      <p className="text-[11px] text-muted-foreground">{t("lead.consent")}</p>
    </form>
  );
}
