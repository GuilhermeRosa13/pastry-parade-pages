import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/confeitaria";
import { oauthReturnPath } from "@/lib/oauth-return-path";

const NEXT_KEY = "doce-encanto-next";

export const Route = createFileRoute("/entrar")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({ next: typeof s['next'] === "string" ? s['next'] : undefined }),
  head: () => pageHead("Entrar", "Acesse sua conta para conectar assistentes de IA à Doce Encanto Confeitaria."),
  component: Entrar,
});

function Entrar() {
  const { next: rawNext } = Route.useSearch();
  const [modo, setModo] = useState<"entrar" | "cadastrar">("entrar");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const destino = () => oauthReturnPath(rawNext ?? sessionStorage.getItem(NEXT_KEY) ?? "/");
  const ir = () => { const d = destino(); sessionStorage.removeItem(NEXT_KEY); window.location.assign(d); };

  useEffect(() => {
    if (rawNext) sessionStorage.setItem(NEXT_KEY, oauthReturnPath(rawNext));
    supabase.auth.getSession().then(({ data }) => { if (data.session) ir(); });
    const { data } = supabase.auth.onAuthStateChange((_e, session) => { if (session) ir(); });
    return () => data.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function enviar(e: FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    if (modo === "entrar") {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
      if (error) setMsg("Não foi possível entrar: verifique e-mail e senha.");
    } else {
      const { error } = await supabase.auth.signUp({
        email, password: senha,
        options: { emailRedirectTo: new URL(destino(), window.location.origin).href },
      });
      setMsg(error ? `Não foi possível cadastrar: ${error.message}` : "Enviamos um link de confirmação para o seu e-mail.");
    }
    setBusy(false);
  }

  async function google() {
    setMsg(null);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/entrar` });
    if (result.error) setMsg("Não foi possível entrar com o Google.");
  }

  return (
    <main className="site-container flex justify-center py-16">
      <div className="w-full max-w-sm rounded-lg border bg-card p-8">
        <h1 className="font-display text-3xl">{modo === "entrar" ? "Entrar" : "Criar conta"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Usado para conectar assistentes de IA ao site.</p>
        <form onSubmit={enviar} className="mt-6 space-y-3">
          <input type="email" required placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border bg-background px-3 py-2" />
          <input type="password" required minLength={6} placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full rounded-md border bg-background px-3 py-2" />
          <Button type="submit" disabled={busy} className="w-full">{modo === "entrar" ? "Entrar" : "Cadastrar"}</Button>
        </form>
        <Button variant="outline" onClick={google} className="mt-3 w-full">Continuar com Google</Button>
        {msg && <p role="alert" className="mt-4 text-sm">{msg}</p>}
        <button type="button" onClick={() => setModo(modo === "entrar" ? "cadastrar" : "entrar")} className="mt-4 text-sm text-primary underline">
          {modo === "entrar" ? "Não tem conta? Cadastre-se" : "Já tem conta? Entrar"}
        </button>
      </div>
    </main>
  );
}
