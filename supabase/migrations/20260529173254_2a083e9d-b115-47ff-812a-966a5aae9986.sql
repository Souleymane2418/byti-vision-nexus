REVOKE ALL ON FUNCTION public.ensure_direction_admin_role() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.ensure_direction_admin_role() FROM anon;
REVOKE ALL ON FUNCTION public.ensure_direction_admin_role() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.ensure_direction_admin_role() TO service_role;

REVOKE ALL ON FUNCTION public.prevent_direction_admin_role_removal() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.prevent_direction_admin_role_removal() FROM anon;
REVOKE ALL ON FUNCTION public.prevent_direction_admin_role_removal() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.prevent_direction_admin_role_removal() TO service_role;