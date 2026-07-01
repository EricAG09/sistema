# Design: Componente Sidebar (Nexus UI)

**Data:** 2026-07-01
**Status:** Aprovado para planejamento
**Pacote:** `@nexus-ui/ui`

## Contexto

Primeiro componente real da biblioteca `@nexus-ui/ui`. Hoje o pacote só reexporta
`theme`, `icons` e `utils` — não há componentes. Portanto o Sidebar **define o padrão
de estrutura, estilização, tema, stories e testes** para todos os componentes futuros
do design system.

O monorepo já possui:

- Sistema de tema (`@nexus-ui/theme`) com `ThemeProvider`, `useTheme` e
  `themeToCssVariables` que expõe o tema como CSS custom properties.
- Design tokens (`@nexus-ui/tokens`): cores, tipografia, espaçamento, raios, sombras,
  breakpoints, z-index, animação.
- Storybook (Vite 5) configurado para carregar `packages/ui/src/**/*.stories.@(ts|tsx|mdx)`.

## Objetivo

Sidebar **completo**: navegação com ícone + label, item ativo, grupos com título de
seção, submenus aninhados, colapsar/expandir, tooltip no modo colapsado, e comportamento
responsivo (off-canvas + overlay no mobile). Nasce na identidade visual da PWR.

## Decisões de design (aprovadas)

1. **API composicional** — subcomponentes (`Sidebar.Item`, `Sidebar.Group`, etc.), não
   orientada a dados. Mais flexível e idiomática para um design system.
2. **Estilização com CSS Modules + CSS variables** do tema. Zero dependências novas.
   Temizável / white-label.
3. **Paleta PWR** — ajustar tokens e `defaultTheme` para a identidade corporativa.
4. **Estrutura pasta-por-componente** com subcomponentes em arquivos separados.
5. **`active` é controle manual do consumidor** — o design system não acopla a router.
6. **Navegação por setas (roving tabindex) fica fora da v1.** Só Tab / Enter / Esc.
7. **Variante padrão é escura** (azul PWR), com `variant="light"` disponível.

## Estrutura de arquivos

Define o padrão dos próximos componentes.

```
packages/ui/src/
  Sidebar/
    Sidebar.tsx              # container + provê SidebarContext
    SidebarHeader.tsx        # topo (logo / marca)
    SidebarItem.tsx          # item de navegação (icon + label, active, href/onClick)
    SidebarGroup.tsx         # grupo com label de seção
    SidebarSubmenu.tsx       # item expansível com filhos aninhados
    SidebarFooter.tsx        # rodapé (usuário, versão)
    SidebarContext.ts        # estado: collapsed, isMobile, variant
    Sidebar.module.css       # estilos via CSS vars
    Sidebar.stories.tsx      # stories para Storybook
    Sidebar.test.tsx         # testes (vitest + testing-library)
    index.ts                 # reexporta com namespacing (Sidebar.Item etc.)
  css.d.ts                   # declara módulos *.module.css para o tsc
  index.ts                   # + export * from './Sidebar'
```

Nota técnica: `packages/ui` compila com `tsc` (não bundler). Para o `tsc` aceitar
`import styles from './Sidebar.module.css'` é necessário um `css.d.ts` declarando
`declare module '*.module.css'`. O CSS em si não é processado pelo `tsc` — é processado
pelo Vite no Storybook (onde o componente é visualizado).

## API

```tsx
<Sidebar defaultCollapsed={false} onCollapsedChange={fn} aria-label="Navegação principal">
  <Sidebar.Header>
    <Logo />
  </Sidebar.Header>

  <Sidebar.Group label="Gestão">
    <Sidebar.Item icon={<Home />} label="Início" active href="/" />
    <Sidebar.Submenu icon={<Users />} label="Clientes" defaultOpen>
      <Sidebar.Item label="Listar" href="/clientes" />
      <Sidebar.Item label="Novo" href="/clientes/novo" />
    </Sidebar.Submenu>
  </Sidebar.Group>

  <Sidebar.Footer>
    <UserChip />
  </Sidebar.Footer>
</Sidebar>
```

### Props

**`Sidebar`**
- `collapsed?: boolean` — controlado.
- `defaultCollapsed?: boolean` — não-controlado (padrão `false`).
- `onCollapsedChange?: (collapsed: boolean) => void`.
- `variant?: 'dark' | 'light'` — padrão `'dark'`.
- `width?: string` — padrão `16rem`.
- `collapsedWidth?: string` — padrão `4rem`.
- `open?: boolean` / `onOpenChange?` — controle do off-canvas no mobile.
- `aria-label: string` — obrigatório (aplicado no `<nav>`).

**`Sidebar.Item`**
- `label: string` (obrigatório).
- `icon?: React.ReactNode`.
- `active?: boolean` — controle manual do consumidor; gera `aria-current="page"`.
- `href?: string` — renderiza `<a>`; senão `<button>`.
- `onClick?`.
- `disabled?: boolean`.
- `badge?: React.ReactNode`.

**`Sidebar.Submenu`**
- `label: string`, `icon?`.
- `defaultOpen?: boolean`, `open?` / `onOpenChange?` (controle opcional).
- filhos: `Sidebar.Item`.

**`Sidebar.Group`**
- `label?: string` — título de seção; no colapsado vira divisor (sem texto).

**`Sidebar.Header` / `Sidebar.Footer`**
- apenas `children`.

## Estado & comportamento

- `SidebarContext` guarda `collapsed`, `isMobile`, `variant`.
- Colapsar é controlado **ou** não-controlado (padrão React de `defaultCollapsed` +
  `onCollapsedChange`).
- **Colapsado:** só ícones; labels/badges ocultos; hover num item exibe **tooltip** com
  o label; `Sidebar.Group label` some (vira divisor). Submenus abrem em **flyout** ao
  hover/focus.
- **Mobile** (abaixo do breakpoint `md`, via `matchMedia`): sidebar vira off-canvas com
  **overlay** escurecido; `Esc` e clique no overlay fecham; foco preso (focus trap)
  enquanto aberto.
- **Acessibilidade:**
  - `<nav aria-label>`.
  - item ativo com `aria-current="page"`.
  - submenu com `aria-expanded` + `aria-controls`.
  - tooltip associado via `aria-describedby`.
  - teclado: **Tab / Enter / Esc** (setas / roving tabindex ficam para versão futura).

## Tema & paleta PWR

Ajustes em `packages/tokens/src/index.ts` e no `defaultTheme` de `@nexus-ui/theme`:

- `colors.primary`: `#FF5B00` (laranja PWR).
- Superfícies escuras do sidebar (azul PWR): `#05244F`.
- Azuis de apoio: `#273A76`, `#3C58B4`.

Novas CSS variables específicas do sidebar (definidas por variante), consumidas pelo
`Sidebar.module.css`:

- `--sidebar-bg`, `--sidebar-fg`, `--sidebar-muted`
- `--sidebar-active-bg`, `--sidebar-active-fg`
- `--sidebar-hover-bg`, `--sidebar-border`

Variante `dark` (padrão): fundo `#05244F`, texto branco, item ativo com destaque laranja
`#FF5B00`. Variante `light`: fundo branco/surface, texto azul escuro, ativo laranja.

O componente lê apenas CSS variables — white-label continua funcionando trocando o tema.

## Testes & visualização

**`Sidebar.stories.tsx`** (o que se "vê" via `pnpm storybook`):
- `Default` — expandido, escuro, com grupos e item ativo.
- `Collapsed` — colapsado com tooltips.
- `WithSubmenus` — submenus abertos e flyout no colapsado.
- `Mobile` — off-canvas + overlay.
- `LightVariant` — variante clara.

Ícones para as stories: inline nas próprias stories (o `@nexus-ui/icons` ainda é um stub),
para não bloquear neste pacote.

**`Sidebar.test.tsx`** (vitest + @testing-library/react):
- renderiza itens e labels.
- alterna colapsado e esconde labels.
- item ativo recebe `aria-current="page"`.
- abre/fecha submenu e reflete `aria-expanded`.
- overlay fecha ao pressionar `Esc` no modo mobile.
- item com `href` renderiza `<a>`; sem `href` renderiza `<button>`.

## Fora de escopo (v1)

- Navegação por setas / roving tabindex.
- Acoplamento a router (active é manual).
- Persistência do estado colapsado (localStorage).
- Ícones reais no `@nexus-ui/icons`.
