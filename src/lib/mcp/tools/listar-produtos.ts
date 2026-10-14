import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { produtos } from "@/lib/confeitaria";

export default defineTool({
  name: "listar_produtos",
  title: "Listar produtos",
  description: "Lista o catálogo de produtos da Doce Encanto Confeitaria, com filtro opcional por categoria.",
  inputSchema: { categoria: z.string().optional().describe("Categoria, ex.: Bolos, Doces, Cupcakes, Kits.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ categoria }) => {
    const lista = produtos
      .filter((p) => !categoria || p.categoria.toLowerCase() === categoria.toLowerCase())
      .map((p) => ({ nome: p.nome, categoria: p.categoria, descricao: p.descricao }));
    return {
      content: [{ type: "text", text: lista.map((p) => `• ${p.nome} (${p.categoria}): ${p.descricao}`).join("\n") || "Nenhum produto encontrado." }],
      structuredContent: { produtos: lista },
    };
  },
});
