import { useSelector } from "react-redux";
import { MenuItem } from "./SideBarInterFace";
import { permissionsState, roleState } from "@/store/auth";

export const MENUITEMS: MenuItem[] = [
  {
    title: "Dashboard",
    url: `/dashboard`,
    icon: "Home",
    type: "link",
  },
  {
    title: "Contact Area",
    url: `/contacts`,
    icon: "Users",
    type: "link",
  },
  {
    title: "Travel Agent Area",
    url: `/travelagent`,
    icon: "Navigation",
    type: "link",
  },
  { title: "OTA Area", icon: "Coffee", type: "link", url: "/ota" },
  {
    title: "Destination Area",
    icon: "Map",
    type: "sub",
    menu: [
      { url: "/destination/create", title: "Create Destination", type: "link" },
      { url: "/destination/view", title: "Destinations", type: "link" },
    ],
  },
  {
    title: "Product Area",
    icon: "Box",
    type: "sub",
    menu: [
      { url: "/product/create", title: "Create Product", type: "link" },
      { url: "/product/view", title: "Products", type: "link" },
    ],
  },
  {
    title: "Booking Area",
    icon: "Briefcase",
    type: "sub",
    menu: [
      { url: "/booking/create", title: "Create Booking", type: "link" },
      { url: "/booking/view", title: "Bookings", type: "link" },
      { url: "/booking/myview", title: "My Bookings", type: "link" },
    ],
  },
  {
    title: "Promo Code",
    icon: "Gift",
    type: "link",
    url: "/promo",
  },
  {
    title: "Financial Area",
    icon: "Star",
    type: "sub",
    menu: [
      { url: "/financial/revenue", title: "Revenue", type: "link" },
      { url: "/financial/invoices", title: "Invoice Center", type: "link" },
      { url: "/financial/costcenter", title: "Cost Center", type: "link" },
      { url: "/financial/payroll", title: "Payroll", type: "link" },
      { url: "/financial/reporting", title: "Reporting", type: "link" },
      { url: "/financial/margins", title: "Margin Settings", type: "link" },
    ],
  },
  {
    title: "Operation Area",
    icon: "Bookmark",
    type: "link",
    menu: [
      { url: "/operation/guideAssignment", title: "Overview", type: "link" },
      { url: "/operation/scheduling", title: "Scheduling", type: "link" },
      { url: "/operation/report", title: "Report", type: "link" },
    ],
  },
  {
    title: "Employee Portal",
    icon: "Bookmark",
    type: "sub",
    menu: [
      { url: "/employee/information/profile", title: "Profile", type: "link" },
      { url: "/employee/information", title: "All Employees", type: "link" },
      { url: "/employee/salary", title: "Salary Slips", type: "link" },
      { url: "/employee/schedule", title: "Schedule", type: "link" },
      { url: "/employee/reports", title: "Reports", type: "link" },
      { url: "/employee/expenses", title: "Expenses", type: "link" },
      { url: "/employee/goals", title: "Goals", type: "link" },
    ],
  },
  {
    title: "User Area",
    icon: "Users",
    type: "link",
    url: "/users/allusers",
  },
];

const filterMenuItemsByRole = (menu: MenuItem, role: string | undefined) => {
  if (menu.menu) {
    menu.menu = menu.menu.filter((item) => {
      if (menu.title === "Employee Portal" && item.title === "All Employees")
        return role === "Admin";

      if (menu.title === "Booking Area") {
        if (item.title === "Bookings") return role === "Admin";
        if (item.title === "My Bookings") return role !== "Admin";
      }
      return true;
    });
  }
  return menu;
};

export const MenuItems = () => {
  const rolePermissions = useSelector(permissionsState);
  const role = useSelector(roleState);

  // Filter menus based on role permissions
  const liveMenuItems = rolePermissions
    ? MENUITEMS.filter((menu) =>
        rolePermissions.some((selected) => menu.title === selected.target)
      ).map((menu) => filterMenuItemsByRole(menu, role))
    : [];

  return liveMenuItems;
};
