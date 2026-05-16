import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LogOut, Plus, Trash2, Upload } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin · Solara" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

type Project = {
  id: string;
  title: string;
  meta: string;
  image_url: string;
  position: number;
};

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (!s) {
        setIsAdmin(false);
        setLoading(false);
      } else {
        checkRole(s.user.id);
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) checkRole(data.session.user.id);
      else setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function checkRole(userId: string) {
    setLoading(true);
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    setIsAdmin(!!data);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) return <AuthForm />;
  if (!isAdmin) return <NotAdmin email={session.user.email ?? ""} />;
  return <ProjectsAdmin />;
}

function AuthForm() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const fn = mode === "in" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { error } = await fn({ email, password });
    if (error) setMsg(error.message);
    else if (mode === "up") setMsg("Check your email to confirm, then sign in.");
    setBusy(false);
  }

  return (
    <div className="min-h-screen grid place-items-center bg-background px-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 border border-border rounded-2xl p-8 shadow-soft">
        <div>
          <h1 className="text-2xl font-light tracking-tight">Admin {mode === "in" ? "sign in" : "sign up"}</h1>
          <p className="text-sm text-muted-foreground font-light mt-1">Manage selected projects</p>
        </div>
        <Input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
        {msg && <p className="text-xs text-muted-foreground">{msg}</p>}
        <Button type="submit" disabled={busy} className="w-full">
          {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {mode === "in" ? "Sign in" : "Create account"}
        </Button>
        <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="w-full text-xs text-muted-foreground hover:text-foreground">
          {mode === "in" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}

function NotAdmin({ email }: { email: string }) {
  return (
    <div className="min-h-screen grid place-items-center bg-background px-6 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-2xl font-light tracking-tight">Not an admin</h1>
        <p className="text-sm text-muted-foreground font-light">
          Signed in as <b>{email}</b>. Ask an admin to grant you the admin role in <code className="text-xs">user_roles</code>.
        </p>
        <Button variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button>
      </div>
    </div>
  );
}

function ProjectsAdmin() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // form
  const [title, setTitle] = useState("");
  const [meta, setMeta] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("selected_projects")
      .select("*")
      .order("position", { ascending: true });
    setItems((data ?? []) as Project[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function add(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!file) { setErr("Please choose an image."); return; }
    setSaving(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("project-images").upload(path, file);
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("project-images").getPublicUrl(path);
      const nextPos = (items[items.length - 1]?.position ?? 0) + 1;
      const { error: insErr } = await supabase.from("selected_projects").insert({
        title, meta, image_url: pub.publicUrl, position: nextPos,
      });
      if (insErr) throw insErr;
      setTitle(""); setMeta(""); setFile(null);
      (document.getElementById("file-input") as HTMLInputElement | null)?.value && ((document.getElementById("file-input") as HTMLInputElement).value = "");
      await load();
    } catch (e: any) {
      setErr(e.message ?? "Failed to add");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    await supabase.from("selected_projects").delete().eq("id", id);
    load();
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-light tracking-tight">Selected Projects</h1>
            <p className="text-sm text-muted-foreground font-light">Manage the gallery shown on the homepage.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => supabase.auth.signOut()}>
            <LogOut className="w-4 h-4 mr-2" /> Sign out
          </Button>
        </header>

        <form onSubmit={add} className="border border-border rounded-2xl p-6 space-y-3 mb-10">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Add new project</div>
          <Input placeholder="Title (e.g. Banjara Hills Residence)" required value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input placeholder="Meta (e.g. 5 KW · Hyderabad)" required value={meta} onChange={(e) => setMeta(e.target.value)} />
          <Input id="file-input" type="file" accept="image/*" required onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          {err && <p className="text-xs text-destructive">{err}</p>}
          <Button type="submit" disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
            Add project
          </Button>
        </form>

        <div className="space-y-3">
          {loading && <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />}
          {!loading && items.length === 0 && (
            <p className="text-sm text-muted-foreground font-light">No projects yet.</p>
          )}
          {items.map((p) => (
            <div key={p.id} className="flex items-center gap-4 border border-border rounded-xl p-3">
              <img src={p.image_url} alt={p.title} className="w-20 h-20 object-cover rounded-lg bg-muted" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{p.title}</div>
                <div className="text-xs text-muted-foreground truncate">{p.meta}</div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => remove(p.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-muted-foreground font-light flex items-center gap-2">
          <Upload className="w-3.5 h-3.5" /> Images are stored in the project-images bucket.
        </p>
      </div>
    </div>
  );
}
