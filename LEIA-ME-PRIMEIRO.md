# Site de Vitor Rangel — substituição no GitHub Pages

Esta pasta contém a versão completa e estática do novo site, pronta para substituir o site antigo no repositório que já publica `www.vitorrangel.com.br`.

## Antes de substituir

1. Abra o repositório atual no GitHub.
2. Faça um backup usando **Code → Download ZIP**.
3. Confira em **Settings → Pages** qual branch e pasta estão publicando o site. Normalmente será `main` e `/(root)`.

## Como substituir usando o navegador

1. Extraia o arquivo ZIP recebido.
2. No repositório atual, remova os arquivos do site antigo. Preserve apenas arquivos que você saiba que têm outra finalidade.
3. Clique em **Add file → Upload files**.
4. Selecione todos os arquivos que estão dentro desta pasta. Não envie o arquivo ZIP e não crie uma pasta extra no repositório.
5. Confirme que `index.html`, `styles.css`, `CNAME`, `robots.txt`, `sitemap.xml`, as imagens e o `favicon.svg` estão na raiz publicada.
6. Escreva a mensagem `Substitui site antigo pelo novo site de Vitor Rangel`.
7. Clique em **Commit changes**.

Como o repositório já está hospedando o site atual, o GitHub Pages deve publicar a atualização automaticamente em alguns minutos.

## Conferência depois da publicação

- Abra `https://www.vitorrangel.com.br` em uma janela anônima.
- Verifique as duas fotografias.
- Teste os botões do WhatsApp.
- Abra o link das avaliações do Google.
- Confira `https://www.vitorrangel.com.br/robots.txt`.
- Confira `https://www.vitorrangel.com.br/sitemap.xml`.

Se a versão antiga continuar aparecendo, aguarde alguns minutos e atualize a página com `Ctrl + F5`.

## Google Search Console

Depois que o domínio estiver exibindo o site novo:

1. Abra o Google Search Console.
2. Selecione a propriedade `vitorrangel.com.br` ou crie uma propriedade do tipo Domínio.
3. Entre em **Sitemaps**.
4. Envie `https://www.vitorrangel.com.br/sitemap.xml`.
5. Use **Inspeção de URL** para `https://www.vitorrangel.com.br/` e solicite a indexação.
