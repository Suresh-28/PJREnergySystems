import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LogOut, Plus, Trash2, RotateCcw } from "lucide-react";
import {
  loadProjects,
  saveProjects,
  resetProjects,
  fileToCompressedDataUrl,
  type StoredProject,
} from "@/lib/projects-store";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin · PJR Energy Systems" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

const ADMIN_USER = "admin";
const ADMIN_PASS = "Solar@2026";
const SESSION_KEY = "solara.admin.session";

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === "1");
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!authed) return <AuthForm onSuccess={() => setAuthed(true)} />;
  return <ProjectsAdmin onSignOut={() => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false); }} />;
}

function AuthForm({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (username.trim().toLowerCase() === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onSuccess();
    } else {
      setMsg("Invalid username or password.");
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-background px-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 border border-border rounded-2xl p-8 shadow-soft">
        <div>
          <h1 className="text-2xl font-light tracking-tight">Admin sign in</h1>
          <p className="text-sm text-muted-foreground font-light mt-1">Manage selected projects</p>
        </div>
        <Input type="text" placeholder="Username" required autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input type="password" placeholder="Password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {msg && <p className="text-xs text-destructive">{msg}</p>}
        <Button type="submit" className="w-full">Sign in</Button>
      </form>
    </div>
  );
}

function ProjectsAdmin({ onSignOut }: { onSignOut: () => void }) {
  const [items, setItems] = useState<StoredProject[]>([]);
  const [title, setTitle] = useState("");
  const [meta, setMeta] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => { setItems(loadProjects()); }, []);

  async function add(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!file) { setErr("Please choose an image."); return; }
    setSaving(true);
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      const next: StoredProject[] = [
        ...items,
        { id: crypto.randomUUID(), title, meta, image: dataUrl },
      ];
      saveProjects(next);
      setItems(next);
      setTitle(""); setMeta(""); setFile(null);
      const input = document.getElementById("file-input") as HTMLInputElement | null;
      if (input) input.value = "";
    } catch (e: any) {
      setErr(e?.message ?? "Failed to add. The image may be too large for browser storage.");
    } finally {
      setSaving(false);
    }
  }

  function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    const next = items.filter((p) => p.id !== id);
    saveProjects(next);
    setItems(next);
  }

  function resetAll() {
    if (!confirm("Reset to the default starter projects?")) return;
    resetProjects();
    setItems(loadProjects());
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-light tracking-tight">Selected Projects</h1>
            <p className="text-sm text-muted-foreground font-light">Saved in this browser only — no database.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={resetAll}>
              <RotateCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
            <Button variant="outline" size="sm" onClick={onSignOut}>
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </Button>
          </div>
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
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground font-light">No projects yet.</p>
          )}
          {items.map((p) => (
            <div key={p.id} className="flex items-center gap-4 border border-border rounded-xl p-3">
              <img src={p.image} alt={p.title} className="w-20 h-20 object-cover rounded-lg bg-muted" />
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

        <p className="mt-10 text-xs text-muted-foreground font-light">
          Note: uploads are stored in this browser's local storage only — they won't appear on other devices or visitors.
        </p>
      </div>
    </div>
  );
}
