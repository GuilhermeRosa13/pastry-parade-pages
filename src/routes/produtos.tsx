import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { PageIntro, ProductGrid } from '@/components/confeitaria';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/lib/confeitaria';

export const Route = createFileRoute('/produtos')({ head: () => pageHead('Nossos produtos', 'Bolos personalizados, brigadeiros, cupcakes e kits comemorativos em Foz do Iguaçu.'), component: Produtos });
function Produtos() {
  const [categoria, setCategoria] = useState('Todos');
  return <main><PageIntro eyebrow="Nosso catálogo" title="Escolha seu próximo encanto">Bolos, doces e presentes para celebrar. Consulte valores e disponibilidade para a sua encomenda.</PageIntro><div className="site-container pb-20"><div aria-label="Categorias de produtos" className="mb-9 flex flex-wrap justify-center gap-2">{['Todos', 'Bolos', 'Doces', 'Cupcakes', 'Kits'].map(c => <Button key={c} variant={categoria === c ? 'default' : 'ghost'} aria-pressed={categoria === c} onClick={() => setCategoria(c)}>{c}</Button>)}</div><ProductGrid categoria={categoria} /></div></main>;
}