import { defineTool } from "@lovable.dev/mcp-js";

const info = {
  nome: "Doce Encanto Confeitaria",
  localizacao: "Austin, Nova Iguaçu – RJ",
  whatsapp: "(21) 98253-0132",
  link_whatsapp: "https://wa.me/5521982530132",
  site: "https://pastry-parade-pages.lovable.app",
  sobre: "Confeitaria artesanal dedicada a bolos personalizados, doces, cupcakes e kits comemorativos. Orçamentos e dúvidas pelo WhatsApp.",
};

export default defineTool({
  name: "info_confeitaria",
  title: "Informações da confeitaria",
  description: "Retorna localização, contato por WhatsApp e apresentação da Doce Encanto Confeitaria.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: `${info.nome} — ${info.localizacao}\nWhatsApp: ${info.whatsapp} (${info.link_whatsapp})\n${info.sobre}` }],
    structuredContent: { info },
  }),
});
