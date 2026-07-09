export function fmtMoney(v: number | null | undefined, currency = "BRL", locale = "pt-BR") {
  const n = typeof v === "number" && isFinite(v) ? v : 0;
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(n);
  } catch {
    return `R$ ${n.toFixed(2)}`;
  }
}

export function fmtDate(d: string | Date, locale = "pt-BR") {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString(locale);
}

export function firstDayOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}
