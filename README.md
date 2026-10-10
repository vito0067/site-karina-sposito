# Site — Karina Sposito · Psicanálise Clínica

Site feito pela **Origem Digital** para a Karina Sposito (@karina.psicanalise).
Mesma base técnica do site da agência: Next.js + Tailwind, publicado pela Vercel.

**Situação em 10/10/2026:** pronto para publicar. Tudo confirmado com a Karina
(WhatsApp (11) 96364-0004, nome sem "Dra.", psicanalista sem CRP, foto, textos).
Falta só registrar o domínio.

Notas da auditoria do Google (Lighthouse), versão final:

| | Celular | Computador |
|---|---|---|
| SEO | 100 | 100 |
| Acessibilidade | 100 | 100 |
| Desempenho | 84 a 92 | 97 |

---

## 1. Ver o site no seu computador

```bash
npm install
```

```bash
npm run dev
```

Abra **http://localhost:3100**

---

## 2. Subir para o GitHub (pelo navegador)

1. Abra o repositório no GitHub → **Add file → Upload files**.
2. Na pasta `Documents\Karina`, selecione **tudo, menos** estas 3 pastas:
   - `node_modules` (a Vercel instala sozinha)
   - `.next` (gerada pelo computador)
   - `.claude` (configuração local)
3. Arraste para o GitHub e clique em **Commit changes**.

São 83 arquivos — cabe num upload só (o limite do GitHub é 100). Se o GitHub
perguntar, pode substituir os arquivos que já existem.

---

## 3. Publicar na Vercel

1. Vercel → **Add New → Project** → escolha o repositório → **Deploy**.
2. Em 1–2 minutos sai o endereço provisório (`algo.vercel.app`). Já funciona e
   já pode ser mandado para a Karina.
3. **Ligar a estatística de visitas:** projeto → aba **Analytics** → **Enable**.
   É gratuito e sem cookies. Serve para mostrar à Karina quantas pessoas
   visitaram o site.

O endereço do site (usado pelo Google e pela prévia no WhatsApp) se ajusta
sozinho na Vercel. Não precisa mexer em nada.

---

## 4. Domínio karinasposito.com.br

Estava livre em 10/10/2026.

1. Registre em **registro.br** no CPF da Karina (é dela). Custa cerca de R$ 40 por ano.
2. Vercel → projeto → **Settings → Domains** → digite `karinasposito.com.br` → **Add**.
3. A Vercel mostra os dados de DNS. No registro.br: **Domínio → DNS → Editar zona**
   e cadastre exatamente o que a Vercel mostrou.
4. Quando a Vercel mostrar **Valid Configuration**: aba **Deployments** → no
   último deploy, **⋯ → Redeploy**. Isso atualiza o endereço que vai para o Google.

---

## 5. Aparecer no Google

Faça **depois** do domínio estar funcionando.

1. Entre em **search.google.com/search-console** com uma conta Google (de preferência da Karina).
2. **Adicionar propriedade → Prefixo do URL** → `https://karinasposito.com.br`.
3. Método de verificação: **Tag HTML**. O Google mostra algo como
   `<meta name="google-site-verification" content="AbC123..." />`.
   Copie **só o código** de dentro de `content="..."`.
4. No GitHub, abra `lib/site.ts` → lápis (editar) → cole o código entre as aspas de
   `googleVerificacao: ""` → **Commit changes**.
5. Espere a Vercel publicar (1–2 min) e clique em **Verificar** no Search Console.
6. No menu **Sitemaps**, digite `sitemap.xml` → **Enviar**.
7. Em **Inspeção de URL**, cole o endereço do site → **Solicitar indexação**.

O Google costuma mostrar o site entre alguns dias e algumas semanas.

**O que mais ajuda a Karina a ser encontrada:**
- Colocar o link do site na **bio do Instagram** e no **perfil do WhatsApp Business**.
- Postar o link dos textos do blog nos stories quando falar desses temas.

(O Perfil de Empresa do Google não vale para ela: o Google não aceita negócios
que atendem só online.)

---

## 6. Onde mudar cada coisa

| Quero mudar… | Arquivo |
|---|---|
| WhatsApp, e-mail, Instagram, nome, horários, código do Google | `lib/site.ts` (**só aqui** — o site inteiro lê deste arquivo) |
| Textos do topo da página | `components/Hero.tsx` |
| Biografia e formação | `components/Sobre.tsx` |
| Lista de temas atendidos | `lib/temas.ts` |
| Perguntas frequentes | `lib/duvidas.ts` |
| Textos do blog | `content/textos/*.md` |
| Cores | `tailwind.config.ts` |

---

## 7. Fotos

A foto da seção "Sobre mim" está em `public/fotos/karina-sobre.webp`.
Para trocar, substitua o arquivo mantendo o nome (aceita jpg, png ou webp).

O topo da página usa a ilustração animada do amanhecer **de propósito**. Se um dia
quiserem foto ali também, salve como `public/fotos/karina-principal.jpg`.

Depois de trocar a foto, rode `npm run logo` para atualizar a imagem de
compartilhamento (a prévia que aparece no WhatsApp).

---

## 8. Publicar um texto novo no blog

1. Entre em `content/textos/`.
2. Copie um dos arquivos `.md` e renomeie (o nome vira o endereço: `meu-texto.md` → `/textos/meu-texto`).
3. Troque o cabeçalho (`titulo`, `resumo`, `categoria`, `data`) e o conteúdo.
4. Salve. O texto aparece sozinho na página inicial, em `/textos` e no mapa do Google.

---

## 9. Logo e identidade visual

- Arquivos do logo em `public/marca/` (SVG e PNG, colorido / uma cor / fundo escuro, mais a foto de perfil para redes sociais).
- Página para apresentar a marca: **/marca** (não aparece no Google nem no menu).
- Para alterar o logo: ajuste `scripts/gerar-logo.mjs` e rode `npm run logo`.
