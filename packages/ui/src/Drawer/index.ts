import { Drawer as DrawerRoot } from './Drawer';
import { DrawerHeader } from './DrawerHeader';
import { DrawerBody } from './DrawerBody';
import { DrawerFooter } from './DrawerFooter';

type DrawerComponent = typeof DrawerRoot & {
  Header: typeof DrawerHeader;
  Body: typeof DrawerBody;
  Footer: typeof DrawerFooter;
};

const Drawer = DrawerRoot as DrawerComponent;
Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;

export { Drawer };
export type { DrawerProps } from './Drawer';
export type { DrawerHeaderProps } from './DrawerHeader';
export type { DrawerBodyProps } from './DrawerBody';
export type { DrawerFooterProps } from './DrawerFooter';
