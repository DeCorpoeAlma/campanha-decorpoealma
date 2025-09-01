# Campanha De Corpo e Alma - Projeto Frontend

Este projeto é o frontend da campanha "De Corpo e Alma", desenvolvido com React e Vite, utilizando TypeScript para tipagem e Tailwind CSS para estilização. O objetivo é criar uma interface de utilizador moderna e responsiva para a campanha.

## 🚀 Tecnologias Principais

*   **React**: Biblioteca JavaScript para construção de interfaces de utilizador.
*   **Vite**: Ferramenta de build de frontend que oferece uma experiência de desenvolvimento extremamente rápida.
*   **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
*   **Tailwind CSS**: Framework CSS utilitário para construção rápida de designs personalizados.
*   **PostCSS**: Ferramenta para transformar CSS com plugins JavaScript.
*   **ESLint**: Ferramenta de linting para identificar e reportar padrões problemáticos encontrados no código JavaScript/TypeScript.
*   **Netlify**: Plataforma para deploy contínuo e alojamento de aplicações web.

## 📦 Dependências (package.json)

### Dependências de Produção (`dependencies`):
*   [`embla-carousel-autoplay`](https://www.embla-carousel.com/): Plugin de autoplay para o Embla Carousel.
*   [`embla-carousel-react`](https://www.embla-carousel.com/): Componente React para o Embla Carousel.
*   [`esbuild-wasm`](https://esbuild.github.io/): Bundler JavaScript extremamente rápido (versão WebAssembly).
*   [`lucide-react`](https://lucide.dev/): Biblioteca de ícones leves e personalizáveis para React.
*   [`react`](https://react.dev/): Biblioteca principal do React.
*   [`react-dom`](https://react.dev/): Pacote para renderização do React no DOM.
*   [`react-icons`](https://react-icons.github.io/react-icons/): Coleção popular de ícones React.
*   [`react-markdown`](https://github.com/remarkjs/react-markdown): Componente React para renderizar Markdown.
*   [`react-slick`](https://react-slick.neostack.com/): Componente de carrossel para React.
*   [`rehype-raw`](https://github.com/rehypejs/rehype-raw): Plugin Rehype para analisar HTML bruto dentro de Markdown.
*   [`remark-gfm`](https://github.com/remarkjs/remark-gfm): Plugin Remark para suporte a GitHub Flavored Markdown.
*   [`slick-carousel`](https://kenwheeler.github.io/slick/): Carrossel responsivo.

### Dependências de Desenvolvimento (`devDependencies`):
*   [`@eslint/js`](https://eslint.org/): Configurações JavaScript recomendadas para ESLint.
*   [`@types/react`](https://www.npmjs.com/package/@types/react): Definições de tipo para React.
*   [`@types/react-dom`](https://www.npmjs.com/package/@types/react-dom): Definições de tipo para React DOM.
*   [`@types/react-slick`](https://www.npmjs.com/package/@types/react-slick): Definições de tipo para React Slick.
*   [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react/): Plugin React para Vite.
*   [`autoprefixer`](https://github.com/postcss/autoprefixer): Plugin PostCSS para adicionar prefixos de fornecedor automaticamente.
*   [`eslint`](https://eslint.org/): Ferramenta de linting.
*   [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks): Regras de linting para Hooks do React.
*   [`eslint-plugin-react-refresh`](https://www.npmjs.com/package/eslint-plugin-react-refresh): Plugin ESLint para garantir que o Fast Refresh do React funcione corretamente.
*   [`globals`](https://www.npmjs.com/package/globals): Variáveis globais para ESLint.
*   [`postcss`](https://postcss.org/): Ferramenta para transformar CSS.
*   [`tailwindcss`](https://tailwindcss.com/): Framework CSS utilitário.
*   [`typescript`](https://www.typescriptlang.org/): Linguagem de programação TypeScript.
*   [`typescript-eslint`](https://typescript-eslint.io/): Ferramentas ESLint para TypeScript.
*   [`vite`](https://vitejs.dev/): Ferramenta de build de frontend.

## 📂 Estrutura do Projeto

```
.
├── public/                  # Ficheiros estáticos (imagens, fontes, etc.)
│   ├── candidatos/          # Imagens de candidatos
│   ├── fonts/               # Fontes personalizadas (Galano Grotesque Alt)
│   └── images/              # Outras imagens
├── src/                     # Código fonte da aplicação
│   ├── App.tsx              # Componente principal da aplicação
│   ├── components/          # Componentes React reutilizáveis
│   ├── data/                # Dados estáticos ou mocks
│   └── ...                  # Outros ficheiros e diretórios de código
├── .env.example             # Exemplo de variáveis de ambiente
├── .gitignore               # Ficheiros e diretórios a serem ignorados pelo Git
├── eslint.config.js         # Configuração do ESLint
├── index.html               # Ponto de entrada HTML
├── netlify.toml             # Configuração de deploy para Netlify
├── package.json             # Metadados do projeto e scripts
├── postcss.config.js        # Configuração do PostCSS
├── tailwind.config.js       # Configuração do Tailwind CSS
├── tsconfig.json            # Configuração do TypeScript
├── vite.config.ts           # Configuração do Vite
└── ...                      # Outros ficheiros de configuração e scripts
```

## ⚙️ Scripts Disponíveis

No ficheiro `package.json`, os seguintes scripts estão definidos:

*   `dev`: Inicia o servidor de desenvolvimento Vite.
    ```bash
    npm run dev
    ```
*   `build`: Compila o projeto para produção.
    ```bash
    npm run build
    ```
*   `lint`: Executa o ESLint para verificar problemas de código.
    ```bash
    npm run lint
    ```
*   `preview`: Serve a build de produção localmente para pré-visualização.
    ```bash
    npm run preview
    ```

## 🎨 Estilização

O projeto utiliza **Tailwind CSS** para estilização, configurado através de `tailwind.config.js` e `postcss.config.js`.

*   **`tailwind.config.js`**: Define as classes utilitárias do Tailwind, incluindo cores personalizadas (`primary-orange`, `dark-blue`, `light-blue`) e famílias de fontes (`galano-alt`).
*   **`postcss.config.js`**: Configura o PostCSS para processar o CSS, utilizando `tailwindcss` e `autoprefixer` para garantir compatibilidade entre navegadores.

## 📝 Linting e Tipagem

*   **ESLint (`eslint.config.js`)**: Configurado para TypeScript e React, utilizando `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks` e `eslint-plugin-react-refresh`. Garante a qualidade do código e a conformidade com as melhores práticas do React.
*   **TypeScript (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`)**: O projeto é totalmente tipado com TypeScript, o que ajuda a prevenir erros em tempo de desenvolvimento e melhora a manutenibilidade do código.

## 🛠️ Configuração de Build e Desenvolvimento

*   **Vite (`vite.config.ts`)**: Configurado para desenvolvimento React com TypeScript.
    *   **Plugins**: Utiliza `@vitejs/plugin-react`.
    *   **Otimização de Dependências**: Exclui `lucide-react` da otimização.
    *   **Servidor de Desenvolvimento**: Configurado para a porta `5173`, com CORS habilitado e origem `http://localhost:5173`. Permite acesso a ficheiros estáticos na pasta `public`.
    *   **Aliases**: Define `@` como alias para o diretório `src`.
    *   **Build**: Configura o Rollup para criar `manualChunks` para `react` e `react-dom`, otimizando o carregamento.

## ☁️ Deploy Contínuo (Netlify)

O ficheiro `netlify.toml` configura o deploy do projeto no Netlify:

*   **Comando de Build**: `npm run build`
*   **Diretório de Publicação**: `dist` (onde o Vite gera os ficheiros de build).
*   **Redirecionamentos**: Configura um redirecionamento para `index.html` com status `200` para todas as rotas, o que é comum para aplicações SPA (Single Page Application) para lidar com roteamento no lado do cliente.

## 🤖 Chatbot (Backend e Scripts Python)

O projeto inclui diretórios e scripts relacionados a um chatbot e processamento de dados:

*   **`backend/`**: Provavelmente contém o código do backend da aplicação, que pode interagir com o chatbot ou outras funcionalidades.
*   **`chatbot/`**: Contém a lógica do chatbot.
*   **`generate_pdf.py`**: Script Python para geração de PDFs.
*   **`test_chatbot.py`**: Script Python para testes do chatbot.
*   **`fb_media/`**: Diretório para média do Facebook.
*   **`output_facebook_data/`**: Diretório para dados de saída do Facebook.
*   **`facebook_cookies.txt`**: Ficheiro de cookies do Facebook, possivelmente usado para automação ou recolha de dados.

Estes componentes sugerem um workflow que envolve a recolha e processamento de dados do Facebook, possivelmente para alimentar o chatbot ou para análise da campanha.

## 🧪 Testes

Embora não haja um framework de teste explícito configurado no `package.json` para o frontend, a presença de `test_chatbot.py` indica que há testes para a parte do chatbot. Para o frontend, seria recomendável adicionar um framework como Jest ou React Testing Library.