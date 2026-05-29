CREATE OR REPLACE FUNCTION public.ensure_direction_admin_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF lower(coalesce(NEW.email, '')) = 'direction@byti-technologie.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.user_id, 'admin')
    ON CONFLICT DO NOTHING;

    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.user_id, 'staff')
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS ensure_direction_admin_role_trigger ON public.profiles;
CREATE TRIGGER ensure_direction_admin_role_trigger
AFTER INSERT OR UPDATE OF email, user_id ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.ensure_direction_admin_role();

CREATE OR REPLACE FUNCTION public.prevent_direction_admin_role_removal()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  protected_email text;
BEGIN
  SELECT lower(email)
  INTO protected_email
  FROM public.profiles
  WHERE user_id = OLD.user_id
  LIMIT 1;

  IF protected_email = 'direction@byti-technologie.com' AND OLD.role = 'admin' THEN
    RAISE EXCEPTION 'Le compte direction@byti-technologie.com doit rester administrateur.';
  END IF;

  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS prevent_direction_admin_role_removal_trigger ON public.user_roles;
CREATE TRIGGER prevent_direction_admin_role_removal_trigger
BEFORE DELETE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.prevent_direction_admin_role_removal();