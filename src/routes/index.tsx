import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Heart } from 'lucide-react';
import hero from "@/assets/doce-encanto.jpg";
import { Button } from '@/components/ui/button';
import { ProductGrid, Diferenciais } from '@/components/confeitaria';
import { pageHead } from '@/lib/confeitaria';

export const Route = createFileRoute("/")({
  head: () => pageHead('Confeitaria artesanal em Foz do Iguaçu', 'Doce Encanto: bolos personalizados, doces, cupcakes e kits comemorativos feitos para celebrar.'),
  component: Index,
});

function Index() {
  return (
    <main>
      <section className="bakery-hero relative isolate overflow-hidden">
        <img src={hero} alt="Bolo rosa com morangos, brigadeiros e cupcakes artesanais" width={1600} height={1000} fetchPriority="high" className="hero-photo absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="hero-veil absolute inset-0 -z-10" />
        <div className="site-container py-14 md:py-20"><div className="hero-copy max-w-md">
          <p className="eyebrow flex items-center gap-2"><span className="h-px w-7 bg-primary" />Feito à mão. Feito com amor.</p>
          <h1 className="mt-5 font-display text-5xl leading-[1.12] md:text-6xl">Doce Encanto<br /><em className="text-primary">Confeitaria</em></h1>
          <p className="mt-6 max-w-xs text-base leading-relaxed text-foreground/80">Bolos, doces e pequenos encantos para transformar momentos em boas memórias.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg"><Link to="/produtos">Conhecer os produtos <ArrowRight /></Link></Button><Button asChild variant="outline" size="lg"><Link to="/contato">Encomendar <ArrowUpRight /></Link></Button></div>
          <p className="mt-9 flex items-center gap-2 text-xs text-muted-foreground"><Heart className="size-4 text-primary" />Confeitaria artesanal em Foz do Iguaçu</p>
        </div></div>
      </section>
      <section className="site-container py-16"><div className="mb-9 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Para cada ocasião</p><h2 className="mt-3 font-display text-3xl md:text-4xl">Um mundo de doçuras</h2></div><Button asChild variant="link"><Link to="/produtos">Ver todo o catálogo <ArrowRight /></Link></Button></div><ProductGrid /></section>
      <Diferenciais />
      <section className="site-container py-16 text-center"><p className="eyebrow">Nossa essência</p><h2 className="mt-3 font-display text-3xl md:text-4xl">Mais que doces, boas memórias.</h2><p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted-foreground">Uma confeitaria com alma artesanal, pensada para acompanhar as celebrações e os pequenos gestos de carinho.</p><Button asChild variant="link" className="mt-5"><Link to="/sobre">Conheça a Doce Encanto <ArrowRight /></Link></Button></section>
      <section className="border-t py-12"><div className="site-container text-center"><h2 className="font-display text-3xl">Palavras que adoçam</h2><p className="mt-4 text-sm text-muted-foreground">Os depoimentos de clientes estarão aqui quando o projeto tiver um parceiro real.</p></div></section>
      <section className="bg-secondary py-14"><div className="site-container flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left"><div><p className="eyebrow">Sua próxima celebração</p><h2 className="mt-3 font-display text-3xl">Vamos criar algo especial?</h2></div><Button asChild size="lg"><Link to="/contato">Planejar minha encomenda <ArrowUpRight /></Link></Button></div>
      </section>
    </main>
  );
}
