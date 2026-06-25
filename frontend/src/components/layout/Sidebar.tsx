import { NavLink } from "react-router-dom";
import {
  HiViewGrid,
  HiUserGroup,
  HiPlusCircle,
} from "react-icons/hi";

const navItems = [
  { label: "Dashboard",  icon: HiViewGrid,   to: "/dashboard" },
  { label: "Employees",  icon: HiUserGroup,   to: "/employees" },
  { label: "Add Employee", icon: HiPlusCircle, to: "/employees/add" },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-surface-200 h-full pt-2 pb-6">
      <nav className="flex flex-col gap-0.5 px-3">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
              ${isActive
                ? "bg-primary-50 text-primary-700"
                : "text-surface-600 hover:bg-surface-100 hover:text-surface-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`h-4.5 w-4.5 flex-shrink-0 ${isActive ? "text-primary-600" : "text-surface-400"}`} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}