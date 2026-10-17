import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type OAuthResult = { data: { redirect_url?: string; redirect_to?: string; client?: { name?: string }; redirect_uri?: string; scope?: string } | null; error: { message: string } | null };
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<OAuthResult>;
  approveAuthorization: (id: string) => Promise<OAuthResult>;
  denyAuthorization: (id: string) => Promise<OAuthResult>;
};
const oauth = () => (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  head: () => ({ meta: [{ title: "Autorizar acesso — Doce Encanto Confeitaria" }, { name: "robots", content: "noindex" }] }),
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s['authorization_id'] === "string" ? s['authorization_id'] : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Pedido de autorização ausente.");
    const { data } = await supabase.auth.getSession();
    if (!data.session) throw redirect({ to: "/entrar", search: { next: location.pathname + location.searchStr } });
  },
  loader: async ({ location }) => {
    const id = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauth().getAuthorizationDetails(id);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    const { data: u } = await supabase.auth.getUser();
    return { details: data, email: u.user?.email ?? "" };
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="site-container py-16 text-center">
      <h1 className="font-display text-2xl">Não foi possível carregar este pedido</h1>
      <p className="mt-2 text-muted-foreground">{error instanceof Error ? error.message : String(error)}</p>
    </main>
  ),
});

function Consent() {
  const { details, email } = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nome = details?.client?.name ?? "Um aplicativo";

  async function decide(approve: boolean) {
    setBusy(true); setError(null);
    const { data, error } = approve ? await oauth().approveAuthorization(authorization_id) : await oauth().denyAuthorization(authorization_id);
    if (error) { setBusy(false); setError(error.message); return; }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) { setBusy(false); setError("O servidor de autorização não retornou um destino."); return; }
    window.location.href = target;
  }

  return (
    <main className="site-container flex justify-center py-16">
      <div className="w-full max-w-md rounded-lg border bg-card p-8">
        <h1 className="font-display text-2xl">Conectar {nome} à Doce Encanto</h1>
        <p className="mt-3 text-sm text-muted-foreground">Conectado como <strong>{email}</strong>.</p>
        <p className="mt-3 text-sm">{nome} poderá consultar o catálogo e as informações da confeitaria em seu nome.</p>
        <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
          <li>Compartilhar seu perfil básico e e-mail</li>
          {details?.redirect_uri && <li>Destino: {details.redirect_uri}</li>}
        </ul>
        {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
        <div className="mt-6 flex gap-3">
          <Button disabled={busy} onClick={() => decide(true)}>Autorizar</Button>
          <Button variant="outline" disabled={busy} onClick={() => decide(false)}>Cancelar conexão</Button>
        </div>
      </div>
    </main>
  );
}
