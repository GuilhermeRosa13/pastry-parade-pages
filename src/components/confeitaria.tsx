import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight, CakeSlice, Menu, X, Heart, Sparkles, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { produtos } from '@/lib/confeitaria';

const links = [{ to: '/', label: 'Início' }, { to: '/sobre', label: 'Sobre nós' }, { to: '/produtos', label: 'Produtos' }, { to: '/galeria', label: 'Galeria' }, { to: '/contato', label: 'Contato' }] as const;

export function SiteHeader() {
  const [aberto, setAberto] = useState(false);
  return <header className="site-header"><div className="site-container flex items-center justify-between gap-4 py-5">
    <Link to="/" className="brand flex items-center gap-3" onClick={() => setAberto(false)}><CakeSlice className="size-8 text-primary" /><span><span className="block font-display text-2xl leading-none">Rosa</span><span className="mt-1 block text-[10px] uppercase">Confeitaria artesanal</span></span></Link>
    <nav aria-label="Navegação principal" className="hidden items-center gap-7 text-sm md:flex">{links.map(l => <Link key={l.to} to={l.to} activeProps={{ className: 'text-primary' }} activeOptions={{ exact: true }}>{l.label}</Link>)}</nav>
    <Button asChild className="hidden lg:inline-flex"><Link to="/contato">Encomendar <ArrowUpRight /></Link></Button>
    <Button variant="ghost" size="icon" className="md:hidden" aria-label={aberto ? 'Fechar menu' : 'Abrir menu'} aria-expanded={aberto} onClick={() => setAberto(!aberto)}>{aberto ? <X /> : <Menu />}</Button>
  </div>{aberto && <nav aria-label="Navegação móvel" className="site-container flex flex-col gap-4 pb-6 md:hidden">{links.map(l => <Link key={l.to} to={l.to} onClick={() => setAberto(false)}>{l.label}</Link>)}</nav>}</header>;
}

export function SiteFooter() {
  return <footer className="border-t bg-background py-10"><div className="site-container flex flex-col justify-between gap-6 md:flex-row"><div><Link to="/" className="font-display text-2xl">Rosa Confeitaria</Link><p className="mt-2 text-sm text-muted-foreground">Um pouco de carinho em cada doce.</p></div><div className="text-sm text-muted-foreground"><p>Foz do Iguaçu · Paraná</p><p className="mt-2">© 2026 Rosa Confeitaria</p><p className="mt-2 text-xs">Projeto acadêmico · Confeitaria fictícia · Imagens ilustrativas</p></div></div></footer>;
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <div className="site-container py-14 text-center"><p className="eyebrow">{eyebrow}</p><h1 className="mt-3 font-display text-4xl md:text-5xl">{title}</h1><p className="mx-auto mt-5 max-w-xl text-muted-foreground">{children}</p></div>;
}

export function ProductGrid({ categoria = 'Todos' }: { categoria?: string }) {
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{produtos.filter(p => categoria === 'Todos' || p.categoria === categoria).map(p => <article key={p.nome} className="overflow-hidden rounded-lg border bg-card"><Link to="/contato" search={{ produto: p.nome }} aria-label={`Consultar ${p.nome}`}><img src={p.imagem} alt={p.nome} width={600} height={600} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105" /></Link><div className="p-5"><p className="eyebrow text-[10px]">{p.categoria}</p><h3 className="mt-2 font-display text-xl">{p.nome}</h3><p className="mt-3 min-h-16 text-sm leading-relaxed text-muted-foreground">{p.descricao}</p><Button asChild variant="link" className="mt-4 h-auto p-0"><Link to="/contato" search={{ produto: p.nome }}>Consultar encomenda <ArrowUpRight /></Link></Button></div></article>)}</div>;
}

export function Diferenciais() {
  return <section className="bg-secondary py-14"><div className="site-container grid gap-8 md:grid-cols-3">{[{ icon: Heart, title: 'Feito com carinho', text: 'O cuidado artesanal está em cada detalhe.' }, { icon: Sparkles, title: 'Do seu jeito', text: 'Criações personalizadas para a sua ocasião.' }, { icon: Gift, title: 'Para celebrar', text: 'Pequenas e grandes alegrias merecem um doce.' }].map(d => <div key={d.title} className="flex items-start gap-4"><d.icon className="mt-1 size-6 shrink-0 text-primary" /><div><h3 className="font-display text-xl">{d.title}</h3><p className="mt-2 text-sm text-muted-foreground">{d.text}</p></div></div>)}</div></section>;
}