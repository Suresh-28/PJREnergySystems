
DROP POLICY IF EXISTS "admins insert projects" ON public.selected_projects;
DROP POLICY IF EXISTS "admins update projects" ON public.selected_projects;
DROP POLICY IF EXISTS "admins delete projects" ON public.selected_projects;

CREATE POLICY "authenticated insert projects" ON public.selected_projects
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "authenticated update projects" ON public.selected_projects
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "authenticated delete projects" ON public.selected_projects
  FOR DELETE TO authenticated USING (true);
