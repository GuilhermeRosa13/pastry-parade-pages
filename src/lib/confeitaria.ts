import bolo from '@/assets/bolo.jpg';
import doces from '@/assets/doces.jpg';
import cupcakes from '@/assets/cupcakes.jpg';
import kits from '@/assets/kits.jpg';

export const produtos = [
  { nome: 'Bolos personalizados', categoria: 'Bolos', imagem: bolo, descricao: 'Uma criação especial para celebrar aniversários e momentos inesquecíveis.' },
  { nome: 'Doces para festas', categoria: 'Doces', imagem: doces, descricao: 'Brigadeiros e pequenos encantos artesanais para adoçar cada celebração.' },
  { nome: 'Cupcakes', categoria: 'Cupcakes', imagem: cupcakes, descricao: 'Delicados, coloridos e feitos para dar um toque doce à sua mesa.' },
  { nome: 'Kits comemorativos', categoria: 'Kits', imagem: kits, descricao: 'Bolos e doces reunidos em um presente cheio de carinho.' },
];

export function pageHead(titulo: string, descricao: string) {
  return { meta: [
    { title: `${titulo} — Rosa Confeitaria` },
    { name: 'description', content: descricao },
    { property: 'og:title', content: `${titulo} — Rosa Confeitaria` },
    { property: 'og:description', content: descricao },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] };
}