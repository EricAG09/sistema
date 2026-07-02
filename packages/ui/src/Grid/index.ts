import { Grid as GridRoot } from './Grid';
import { GridItem } from './GridItem';

type GridComponent = typeof GridRoot & {
  Item: typeof GridItem;
};

const Grid = GridRoot as GridComponent;
Grid.Item = GridItem;

export { Grid };
export type { GridProps } from './Grid';
export type { GridItemProps } from './GridItem';
