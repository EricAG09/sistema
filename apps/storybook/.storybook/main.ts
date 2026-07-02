import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../../../packages/ui/src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  async viteFinal(config) {
    config.server = config.server || {};
    config.server.fs = config.server.fs || {};
    config.server.fs.allow = [
      ...(config.server.fs.allow ?? []),
      path.resolve(__dirname, '../../../')
    ];

    config.resolve = {
      ...(config.resolve ?? {}),
      alias: {
        ...((config.resolve?.alias as Record<string, string>) ?? {}),
        '@nexus-ui/theme': path.resolve(__dirname, '../../../packages/theme/src/index.tsx'),
        '@nexus-ui/tokens': path.resolve(__dirname, '../../../packages/tokens/src/index.ts'),
        '@nexus-ui/types': path.resolve(__dirname, '../../../packages/types/src/index.ts'),
        '@nexus-ui/icons': path.resolve(__dirname, '../../../packages/icons/src/index.ts'),
        '@nexus-ui/utils': path.resolve(__dirname, '../../../packages/utils/src/index.ts')
      }
    };

    return config;
  }
};

export default config;
