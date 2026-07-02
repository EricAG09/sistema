import { Navbar as NavbarRoot } from './Navbar';
import { NavbarBrand } from './NavbarBrand';
import { NavbarItems } from './NavbarItems';
import { NavbarItem } from './NavbarItem';
import { NavbarActions } from './NavbarActions';

type NavbarComponent = typeof NavbarRoot & {
  Brand: typeof NavbarBrand;
  Items: typeof NavbarItems;
  Item: typeof NavbarItem;
  Actions: typeof NavbarActions;
};

const Navbar = NavbarRoot as NavbarComponent;
Navbar.Brand = NavbarBrand;
Navbar.Items = NavbarItems;
Navbar.Item = NavbarItem;
Navbar.Actions = NavbarActions;

export { Navbar };
export type { NavbarProps } from './Navbar';
export type { NavbarBrandProps } from './NavbarBrand';
export type { NavbarItemsProps } from './NavbarItems';
export type { NavbarItemProps } from './NavbarItem';
export type { NavbarActionsProps } from './NavbarActions';
