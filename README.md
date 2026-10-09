# Site — Karina Sposito · Psicanálise Clínica

Site feito pela **Origem Digital** para a Karina Sposito (@karina.psicanalise).
Mesma base técnica do site da agência: Next.js + Tailwind, publicado pela Vercel.

---

## 1. Ver o site no seu computador

1. Abra o terminal nesta pasta (`Documents\Karina`).
2. Na primeira vez, instale as dependências:
   ```bash
   npm install
   ```
3. Rode o site:
   ```bash
   npm run dev
   ```
4. Abra no navegador: **http://localhost:3100**
   (porta 3100 para não brigar com o site da agência, que usa a 3000).

---

## 2. ⚠️ Confirmar com a Karina ANTES de publicar

| # | O quê | Por quê |
|---|---|---|
| 1 | **Número do WhatsApp** | O formulário tem máscara de telefone americana e o número chegou como "(196) 364-0004". Coloquei **(19) 96364-0004**, que é o mais provável. Se estiver errado, todos os botões do site levam para o número errado. |
| 2 | **CRP** | No campo CRP ela escreveu "CBO 2515-50" (código de ocupação de psicanalista), e o Instagram diz "Bacharel em Psicologia · Pós em Psicanálise Clínica". Por isso o site a apresenta como **psicanalista**, não como psicóloga. Se ela tiver CRP ativo, avise que eu ajusto. |
| 3 | **"Dra."** | Ela pediu "Dra. Karina Sposito". Deixei sem o título (o Instagram dela também não usa; sem doutorado, pode ser lido como enganoso). Se ela fizer questão, é uma linha. |
| 4 | **Fotos** | Ela não mandou fotos. O site está completo sem elas (ilustrações no lugar), mas fica ainda melhor com 2 fotos verticais dela, boa luz, fundo claro. |
| 5 | **Textos** | Os 3 textos do blog e a biografia foram escritos a partir das respostas dela. Ela precisa ler e aprovar — é a voz profissional dela. |
| 6 | **Domínio** | Sugestão: **karinasposito.com.br** (livre em 09/10/2026). Alternativas livres: karinapsicanalise.com.br, karinaspositopsicanalise.com.br. |
| 7 | **TCC** | Ela marcou Psicanálise e TCC. O site diz que a psicanálise é a base e a TCC entra como recurso quando ajuda. Confirmar se é assim que ela trabalha. |

---

## 3. Onde mudar cada coisa

| Quero mudar… | Arquivo |
|---|---|
| WhatsApp, e-mail, Instagram, nome, domínio, horários | `lib/site.ts` (**só aqui** — o site inteiro lê deste arquivo) |
| Textos do topo da página | `components/Hero.tsx` |
| Biografia e formação | `components/Sobre.tsx` |
| Lista de temas atendidos | `lib/temas.ts` |
| Perguntas frequentes | `lib/duvidas.ts` |
| Textos do blog | `content/textos/*.md` |
| Cores | `tailwind.config.ts` |

---

## 4. Colocar as fotos da Karina

Salve as fotos em `public/fotos/` com estes nomes (jpg, png ou webp):

- `karina-principal.jpg` → aparece no topo da página, dentro do arco
- `karina-sobre.jpg` → aparece na seção "Sobre mim"

Não precisa mexer em código: o site detecta a foto e troca a ilustração sozinho.
Fotos **verticais** funcionam melhor (proporção 4:5).

---

## 5. Publicar um texto novo no blog

1. Entre em `content/textos/`.
2. Copie um dos arquivos `.md` e renomeie (o nome vira o endereço: `meu-texto.md` → `/textos/meu-texto`).
3. Troque o cabeçalho (`titulo`, `resumo`, `categoria`, `data`) e o conteúdo.
4. Salve. O texto aparece sozinho na página inicial e em `/textos`.

---

## 6. Logo e identidade visual

- Todos os arquivos do logo estão em `public/marca/` (SVG e PNG, colorido / uma cor / fundo escuro, mais a foto de perfil para redes sociais).
- Página para apresentar a marca à Karina: **http://localhost:3100/marca** (não aparece no Google nem no menu).
- Para alterar o logo: ajuste `scripts/gerar-logo.mjs` e rode `npm run logo`.

---

## 7. Publicar (mesmo fluxo do site da agência)

1. Crie um repositório novo no GitHub (ex.: `site-karina-sposito`) e envie esta pasta.
2. Na Vercel: **Add New → Project** → escolha o repositório → **Deploy**. Não precisa configurar nada.
3. Depois de registrar o domínio: Vercel → projeto → **Settings → Domains** → adicione o domínio e siga as instruções de DNS.
4. Se o domínio final não for `karinasposito.com.br`, troque o campo `url` em `lib/site.ts`.
