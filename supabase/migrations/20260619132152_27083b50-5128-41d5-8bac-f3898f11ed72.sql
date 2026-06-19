
-- LEADS
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  financial_goal TEXT,
  language TEXT NOT NULL DEFAULT 'pt-BR',
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.leads TO anon, authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 120
    AND length(email) BETWEEN 3 AND 254
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (whatsapp IS NULL OR length(whatsapp) <= 32)
    AND (financial_goal IS NULL OR length(financial_goal) <= 60)
    AND language IN ('pt-BR','en','es')
  );

-- SPONSORS
CREATE TABLE public.sponsors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sponsor_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  logo_url TEXT,
  image_url TEXT,
  link_url TEXT NOT NULL,
  button_text TEXT NOT NULL DEFAULT 'Conhecer',
  coupon_code TEXT,
  placement TEXT NOT NULL DEFAULT 'partners' CHECK (placement IN ('home','articles','partners','footer')),
  language TEXT NOT NULL DEFAULT 'all' CHECK (language IN ('pt-BR','en','es','all')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  clicks INTEGER NOT NULL DEFAULT 0,
  impressions INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.sponsors TO anon, authenticated;
GRANT ALL ON public.sponsors TO service_role;
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active sponsors"
  ON public.sponsors FOR SELECT
  TO anon, authenticated
  USING (
    is_active = true
    AND (start_date IS NULL OR start_date <= now())
    AND (end_date IS NULL OR end_date >= now())
  );

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER sponsors_touch_updated_at
  BEFORE UPDATE ON public.sponsors
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Anonymous click/impression counters (security definer; tiny surface)
CREATE OR REPLACE FUNCTION public.increment_sponsor_metric(_id UUID, _metric TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _metric = 'click' THEN
    UPDATE public.sponsors SET clicks = clicks + 1 WHERE id = _id AND is_active = true;
  ELSIF _metric = 'impression' THEN
    UPDATE public.sponsors SET impressions = impressions + 1 WHERE id = _id AND is_active = true;
  END IF;
END; $$;

GRANT EXECUTE ON FUNCTION public.increment_sponsor_metric(UUID, TEXT) TO anon, authenticated;
