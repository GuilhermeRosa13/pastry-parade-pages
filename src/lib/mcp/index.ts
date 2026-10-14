import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listarProdutos from "./tools/listar-produtos";
import infoConfeitaria from "./tools/info-confeitaria";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "pastry-parade-pages",
  title: "Pastry Parade Pages",
  version: "0.1.0",
  instructions: "Ferramentas da Doce Encanto Confeitaria: consultar o catálogo de produtos e as informações de contato e localização.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listarProdutos, infoConfeitaria],
});
