-- Restrict SELECT on leads to admin role only
CREATE POLICY "Only admins can read leads"
ON public.leads
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Prevent public/anon/authenticated from directly calling internal SECURITY DEFINER functions.
-- handle_new_user is a trigger function; no role should invoke it directly.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- has_role is used by RLS policies. Restrict direct execution but keep it callable
-- by the SQL executor inside policies (service_role & postgres retain access).
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;

-- increment_sponsor_metric bumps counters and should not be arbitrarily callable
-- by anonymous users; keep it available for signed-in users only.
REVOKE EXECUTE ON FUNCTION public.increment_sponsor_metric(uuid, text) FROM PUBLIC, anon;