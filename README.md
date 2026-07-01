# Nexus UI

Design System corporativo para todos os sistemas da empresa.

## Estrutura do monorepo

- `apps/storybook`: documentação de componentes e visualização de stories.
- `apps/docs`: site de documentação inicial do design system.
- `apps/playground`: ambiente para testar componentes e temas.
- `packages/ui`: biblioteca principal de componentes React.
- `packages/icons`: coleção de ícones como componentes React.
- `packages/hooks`: hooks reutilizáveis de UI.
- `packages/theme`: engine de temas e provedor de contexto.
- `packages/tokens`: Design Tokens centrais.
- `packages/utils`: helpers compartilhados.
- `packages/types`: tipos globais e definições do design system.
- `packages/eslint-config`: regras compartilhadas.
- `packages/tsconfig`: configuração TypeScript compartilhada.

## Scripts principais

```bash
pnpm install
pnpm storybook
pnpm docs
pnpm playground
pnpm build
pnpm lint
pnpm test
```
