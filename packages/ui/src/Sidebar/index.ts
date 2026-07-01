import { Sidebar as SidebarRoot } from './Sidebar';
import { SidebarHeader } from './SidebarHeader';
import { SidebarFooter } from './SidebarFooter';
import { SidebarGroup } from './SidebarGroup';
import { SidebarItem } from './SidebarItem';
import { SidebarSubmenu } from './SidebarSubmenu';

type SidebarComponent = typeof SidebarRoot & {
  Header: typeof SidebarHeader;
  Footer: typeof SidebarFooter;
  Group: typeof SidebarGroup;
  Item: typeof SidebarItem;
  Submenu: typeof SidebarSubmenu;
};

const Sidebar = SidebarRoot as SidebarComponent;
Sidebar.Header = SidebarHeader;
Sidebar.Footer = SidebarFooter;
Sidebar.Group = SidebarGroup;
Sidebar.Item = SidebarItem;
Sidebar.Submenu = SidebarSubmenu;

export { Sidebar };
export type { SidebarProps } from './Sidebar';
export { SidebarHeader, SidebarFooter, SidebarGroup, SidebarItem, SidebarSubmenu };
export type { SidebarHeaderProps } from './SidebarHeader';
export type { SidebarFooterProps } from './SidebarFooter';
export type { SidebarGroupProps } from './SidebarGroup';
export type { SidebarItemProps } from './SidebarItem';
export type { SidebarSubmenuProps } from './SidebarSubmenu';
