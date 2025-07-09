export interface SideBarInterFace {
  menu: MenuItem[];
  className?: string;
  activeMenu: any;
  setActiveMenu: (temp: any) => void;
  level: number;
}

export interface MenuItem {
  title: string;
  url?: string;
  icon?:
    | "Home"
    | "Users"
    | "Map"
    | "Briefcase"
    | "Coffee"
    | "Navigation"
    | "Box"
    | "Target"
    | "Bookmark"
    | "MessageSquare"
    | "Settings"
    | "LogIn"
    | "PlusCircle"
    | "Gift"
    | "Star";
  type: "link" | "sub";
  menu?: MenuItem[];
}
