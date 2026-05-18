DROP TABLE IF EXISTS public.selected_projects CASCADE;

-- Drop storage policies that reference has_role (so we can drop the function)
DROP POLICY IF EXISTS "admins delete project images" ON storage.objects;
DROP POLICY IF EXISTS "admins update project images" ON storage.objects;
DROP POLICY IF EXISTS "admins upload project images" ON storage.objects;
DROP POLICY IF EXISTS "public read project images" ON storage.objects;

-- Make the unused bucket private (no anon listing/reads)
UPDATE storage.buckets SET public = false WHERE id = 'project-images';

DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role) CASCADE;
DROP TYPE IF EXISTS public.app_role CASCADE;