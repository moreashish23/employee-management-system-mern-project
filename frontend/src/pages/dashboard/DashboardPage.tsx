import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiUserGroup, HiOfficeBuilding, HiPlus, HiTrendingUp,
} from "react-icons/hi";
import { useEmployees } from "../../hooks/useEmployees";
import { useAuth } from "../../hooks/useAuth";
import { StatCardSkeleton } from "../../components/common/SkeletonLoader";
import { DEPARTMENT_COLORS, Department } from "../../types/employee.types";
import { formatDate } from "../../utils/formatters";
import Button from "../../components/common/Button";

export default function DashboardPage() {
  const { user } = useAuth();
  const { loadEmployees, employees, meta, isLoading, filters } = useEmployees();

  useEffect(() => {
    loadEmployees();
  }, []);

  const deptCount = employees.reduce<Record<string, number>>((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  const topDept = Object.entries(deptCount).sort((a, b) => b[1] - a[1])[0];
  const recentEmployees = [...employees]
    .sort((a, b) => new Date(b.joiningDate).getTime() - new Date(a.joiningDate).getTime())
    .slice(0, 5);

  const stats = [
    {
      label: "Total Employees",
      value: meta.total,
      icon: HiUserGroup,
      color: "text-primary-600",
      bg: "bg-primary-50",
    },
    {
      label: "Departments",
      value: Object.keys(deptCount).length,
      icon: HiOfficeBuilding,
      color: "text-success-600",
      bg: "bg-success-50",
    },
    {
      label: "Top Department",
      value: topDept?.[0] || "—",
      icon: HiTrendingUp,
      color: "text-warning-600",
      bg: "bg-warning-50",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-surface-900">
            Good morning, {user?.name?.split(" ")[0]} 
          </h1>
          <p className="text-sm text-surface-500 mt-0.5">
            Here's what's happening with your team today.
          </p>
        </div>
        <Link to="/employees/add">
          <Button leftIcon={<HiPlus className="h-4 w-4" />} size="sm">
            Add Employee
          </Button>
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <StatCardSkeleton key={i} />)
          : stats.map(({ label, value, icon: Icon, color, bg }) => (
              <div
                key={label}
                className="bg-white rounded-xl p-5 shadow-card flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-medium text-surface-500 uppercase tracking-wide">
                    {label}
                  </p>
                  <p className="text-2xl font-semibold text-surface-900 mt-1">
                    {value}
                  </p>
                </div>
                <div className={`h-10 w-10 rounded-xl ${bg} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
              </div>
            ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Department breakdown */}
        <div className="bg-white rounded-xl shadow-card p-5">
          <h2 className="text-sm font-semibold text-surface-900 mb-4">
            Department Breakdown
          </h2>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="animate-skeleton bg-surface-200 rounded h-5 w-20" />
                  <div className="flex-1 animate-skeleton bg-surface-200 rounded-full h-2" />
                  <div className="animate-skeleton bg-surface-200 rounded h-4 w-6" />
                </div>
              ))}
            </div>
          ) : Object.keys(deptCount).length === 0 ? (
            <p className="text-sm text-surface-400 text-center py-6">
              No employees yet. <Link to="/employees/add" className="text-primary-600">Add one →</Link>
            </p>
          ) : (
            <div className="space-y-3">
              {Object.entries(deptCount)
                .sort((a, b) => b[1] - a[1])
                .map(([dept, count]) => (
                  <div key={dept} className="flex items-center gap-3">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full w-24 text-center flex-shrink-0 ${DEPARTMENT_COLORS[dept as Department]}`}
                    >
                      {dept}
                    </span>
                    <div className="flex-1 bg-surface-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-primary-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${(count / meta.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-surface-600 w-4 text-right">
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Recent joiners */}
        <div className="bg-white rounded-xl shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-surface-900">
              Recent Joiners
            </h2>
            <Link
              to="/employees"
              className="text-xs text-primary-600 hover:text-primary-700 font-medium"
            >
              View all →
            </Link>
          </div>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="animate-skeleton bg-surface-200 rounded-full h-8 w-8" />
                  <div className="space-y-1.5 flex-1">
                    <div className="animate-skeleton bg-surface-200 rounded h-3 w-32" />
                    <div className="animate-skeleton bg-surface-200 rounded h-2.5 w-20" />
                  </div>
                  <div className="animate-skeleton bg-surface-200 rounded h-3 w-16" />
                </div>
              ))}
            </div>
          ) : recentEmployees.length === 0 ? (
            <p className="text-sm text-surface-400 text-center py-6">
              No employees yet.
            </p>
          ) : (
            <div className="space-y-3">
              {recentEmployees.map((emp) => (
                <Link
                  key={emp._id}
                  to={`/employees/${emp._id}`}
                  className="flex items-center gap-3 hover:bg-surface-50 -mx-2 px-2 py-1.5 rounded-lg transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-semibold flex-shrink-0">
                    {emp.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-900 truncate">
                      {emp.fullName}
                    </p>
                    <p className="text-xs text-surface-400 truncate">
                      {emp.designation}
                    </p>
                  </div>
                  <span className="text-xs text-surface-400 flex-shrink-0">
                    {formatDate(emp.joiningDate)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}