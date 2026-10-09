import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Doce Ateliê — Confeitaria Artesanal" },
      { name: "description", content: "Bolos, tortas, macarons e doces finos feitos à mão. Encomende para sua festa." },
      { property: "og:title", content: "Doce Ateliê — Confeitaria Artesanal" },
      { property: "og:description", content: "Bolos, tortas, macarons e doces finos feitos à mão." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const produtos = [
  { nome: "Bolos de Festa", desc: "Massas leves e recheios generosos, decorados sob medida.", preco: "a partir de R$ 180" },
  { nome: "Tortas", desc: "Torta de morango, limão siciliano e chocolate belga.", preco: "a partir de R$ 95" },
  { nome: "Macarons", desc: "Caixas com sabores de pistache, framboesa e baunilha.", preco: "R$ 48 / 6 un." },
  { nome: "Doces Finos", desc: "Brigadeiros gourmet e bem-casados para casamentos.", preco: "a partir de R$ 3,50 / un." },
];

function Index() {
  return (
    <main className="font-sans">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-2xl font-bold text-primary">Doce Ateliê</span>
        <nav className="hidden gap-8 text-sm font-semibold md:flex">
          <a href="#cardapio" className="hover:text-primary">Cardápio</a>
          <a href="#sobre" className="hover:text-primary">Sobre</a>
          <a href="#contato" className="hover:text-primary">Contato</a>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Confeitaria artesanal</p>
          <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            Doçura feita à mão, <em className="text-primary">todos os dias</em>.
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Bolos, tortas e doces finos preparados com ingredientes selecionados para tornar seus momentos inesquecíveis.
          </p>
          <a href="#contato" className="mt-8 inline-block rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:opacity-90">
            Fazer encomenda
          </a>
        </div>
        <img src={hero} alt="Vitrine com macarons, torta de morango e bolo de chocolate" width={1600} height={1008} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl" />
      </section>

      <section id="cardapio" className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-display text-4xl">Nosso cardápio</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {produtos.map((p) => (
              <div key={p.nome} className="rounded-2xl border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg">
                <h3 className="font-display text-xl">{p.nome}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <p className="mt-4 text-sm font-bold text-primary">{p.preco}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sobre" className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="font-display text-4xl">Nossa história</h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Nascemos do amor pela confeitaria e das receitas de família. Cada doce é preparado em pequenas fornadas, sem conservantes, com o cuidado que você merece.
        </p>
      </section>

      <section id="contato" className="border-t py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 text-center md:grid-cols-3">
          <div><h3 className="font-display text-xl">Endereço</h3><p className="mt-2 text-muted-foreground">Rua das Flores, 123 — São Paulo</p></div>
          <div><h3 className="font-display text-xl">Horário</h3><p className="mt-2 text-muted-foreground">Ter a Sáb, 9h às 19h</p></div>
          <div><h3 className="font-display text-xl">Encomendas</h3><p className="mt-2 text-muted-foreground">WhatsApp (11) 99999-0000</p></div>
        </div>
        <p className="mt-12 text-center text-xs text-muted-foreground">© 2026 Doce Ateliê</p>
      </section>
    </main>
  );
}
