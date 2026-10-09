import fs from "node:fs";
import path from "node:path";

// As fotos da Karina ainda não chegaram. Enquanto isso o site mostra uma
// ilustração no lugar. Quando chegarem, basta salvar em `public/fotos/`
// com estes nomes (jpg, jpeg, png ou webp) que elas aparecem sozinhas:
//
//   karina-principal  → foto do topo da página (vertical, de preferência)
//   karina-sobre      → foto da seção "Sobre mim" (vertical)
//
export function foto(nome: "karina-principal" | "karina-sobre"): string | null {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    const arquivo = path.join(process.cwd(), "public", "fotos", `${nome}.${ext}`);
    if (fs.existsSync(arquivo)) return `/fotos/${nome}.${ext}`;
  }
  return null;
}
