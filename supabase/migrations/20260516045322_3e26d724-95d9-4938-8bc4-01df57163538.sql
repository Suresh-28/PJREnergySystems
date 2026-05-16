-- Roles
CREATE TYPE public.app_role AS ENUM ('admin','user');
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "users view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Projects
CREATE TABLE public.selected_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  meta TEXT NOT NULL,
  image_url TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.selected_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read projects" ON public.selected_projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins insert projects" ON public.selected_projects FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update projects" ON public.selected_projects FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete projects" ON public.selected_projects FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Storage bucket for project images
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images','project-images', true) ON CONFLICT DO NOTHING;

CREATE POLICY "public read project images" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'project-images');
CREATE POLICY "admins upload project images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update project images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'project-images' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete project images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'project-images' AND public.has_role(auth.uid(),'admin'));

-- Seed with current 4 demo projects
INSERT INTO public.selected_projects (title, meta, image_url, position) VALUES
  ('Banjara Hills Residence','5 KW · Hyderabad','/seed/project-1.jpg',1),
  ('Coastal Villa','8 KW · Goa','/seed/project-2.jpg',2),
  ('Palm Court House','3 KW · Pune','/seed/project-3.jpg',3),
  ('Lakeside Modern','10 KW · Bengaluru','/seed/project-4.jpg',4);
