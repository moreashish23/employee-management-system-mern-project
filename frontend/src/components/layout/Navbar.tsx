import { useState } from "react";
import { Link } from "react-router-dom";
import { HiLogout, HiUser, HiChevronDown } from "react-icons/hi";
import { useAuth } from "../../hooks/useAuth";
import { getInitials } from "../../utils/formatters";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="h-14 bg-white border-b border-surface-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <Link
        to="/dashboard"
        className="flex items-center gap-2.5 font-semibold text-surface-900"
      >
        <div className="h-7 w-7 rounded-lg bg-primary-600 flex items-center justify-center">
          <span className="text-white text-xs font-bold">E</span>
        </div>
        <span className="hidden sm:block text-sm">EMS</span>
      </Link>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-surface-100 transition-colors"
        >
          <div className="h-7 w-7 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-semibold">
            {user ? getInitials(user.name) : "?"}
          </div>
          <span className="hidden sm:block text-sm font-medium text-surface-700 max-w-[120px] truncate">
            {user?.name}
          </span>
          <HiChevronDown
            className={`h-4 w-4 text-surface-400 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
            />
            <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-xl shadow-card-hover border border-surface-100 z-20 py-1 animate-fade-in">
              <div className="px-3 py-2.5 border-b border-surface-100">
                <p className="text-sm font-medium text-surface-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-surface-400 truncate">{user?.email}</p>
              </div>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-surface-600 hover:bg-surface-50 hover:text-surface-900 transition-colors"
              >
                <HiUser className="h-4 w-4" />
                Profile
              </Link>
              <button
                onClick={() => { logout(); setOpen(false); }}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-danger-600 hover:bg-danger-50 transition-colors"
              >
                <HiLogout className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}