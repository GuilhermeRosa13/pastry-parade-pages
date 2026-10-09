import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PageIntro } from '@/components/confeitaria';
import { produtos, pageHead } from '@/lib/confeitaria';

export const Route = createFileRoute('/galeria')({ head: () => pageHead('Galeria', 'Inspirações de bolos, doces, cupcakes e kits da Rosa Confeitaria.'), component: Galeria });
function Galeria() {
  const [selecionado, setSelecionado] = useState<(typeof produtos)[number] | null>(null);
  return <main><PageIntro eyebrow="Um olhar mais de perto" title="Detalhes que encantam">Inspirações para uma mesa cheia de doçura. Imagens ilustrativas do projeto.</PageIntro><div className="site-container grid gap-6 pb-20 sm:grid-cols-2">{produtos.map(p => <Button key={p.nome} variant="ghost" onClick={() => setSelecionado(p)} className="group relative h-auto overflow-hidden rounded-lg p-0" aria-label={`Ampliar foto de ${p.nome}`}><img src={p.imagem} alt={p.nome} width={600} height={600} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute bottom-4 left-4 rounded-md bg-background/95 px-4 py-2 font-display text-lg">{p.nome}</span></Button>)}</div><Dialog open={!!selecionado} onOpenChange={open => { if (!open) setSelecionado(null); }}><DialogContent className="max-w-xl">{selecionado && <><DialogTitle className="font-display text-2xl">{selecionado.nome}</DialogTitle><img src={selecionado.imagem} alt={selecionado.nome} width={600} height={600} className="w-full rounded-md" /></>}</DialogContent></Dialog></main>;
}