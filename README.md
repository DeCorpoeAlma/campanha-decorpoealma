# Campanha "De Corpo e Alma"

Este é o repositório do site da campanha "Faro. De Corpo e Alma".

## Estrutura do Projeto

- `public/`: Contém arquivos estáticos como imagens.
- `src/`: Contém o código fonte da aplicação frontend em React/TypeScript.
  - `components/`: Componentes reutilizáveis da UI.
  - `data/`: Arquivos contendo dados estáticos.
- `backend/`: Contém o código do backend (chatbot em Python).
- `netlify/`: Contém funções serverless para implantação na Netlify.
- Arquivos de configuração na raiz: `package.json`, `vite.config.ts`, `tsconfig.json`, etc.

## Como Iniciar

1.  Clone o repositório.
2.  Instale as dependências do frontend:
    ```bash
    npm install
    ```
3.  Para iniciar o servidor de desenvolvimento do frontend:
    ```bash
    npm run dev
    ```
    O site estará disponível em `http://localhost:5173` (ou outra porta, se configurado).

4.  Para o backend (chatbot), navegue até a pasta `backend/` e siga as instruções específicas para executá-lo (assumindo que Python e as dependências necessárias estejam instalados).

## Scripts Disponíveis (Frontend)

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm run lint`: Executa o linter.
- `npm run preview`: Visualiza a build de produção localmente.

---

Desenvolvido com ❤️ para Faro.