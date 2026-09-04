import { useEffect, useMemo, useState } from "react";
import {
  Users,
  UserPlus,
  GraduationCap,
  TrendingUp,
  ArrowUpRight,
  Bell,
  Search,
  MoreHorizontal,
  Activity,
  LayoutDashboard,
  Settings,
  HelpCircle,
  ChevronDown,
  Menu,
  X,
  Clock3,
  Sparkles,
  Database,
  CheckCircle2,
  CircleDollarSign,
  Command,
  Filter,
  Download,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getStudents } from "../api/api";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const data = await getStudents();

      if (Array.isArray(data)) {
        setStudents(data);
      } else {
        setStudents(data.students || []);
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const averageAge = useMemo(() => {
    if (!students.length) return 0;

    const totalAge = students.reduce(
      (total, student) => total + Number(student.age || 0),
      0
    );

    return Math.round(totalAge / students.length);
  }, [students]);

  const recentStudents = useMemo(() => {
    return [...students].slice(-5).reverse();
  }, [students]);

  const chartData = useMemo(() => {
    const base = Math.max(students.length, 1);

    return [
      Math.max(2, Math.round(base * 0.35)),
      Math.max(3, Math.round(base * 0.5)),
      Math.max(2, Math.round(base * 0.42)),
      Math.max(4, Math.round(base * 0.65)),
      Math.max(3, Math.round(base * 0.58)),
      Math.max(5, Math.round(base * 0.82)),
      Math.max(4, base),
    ];
  }, [students]);

  const maxChartValue = Math.max(...chartData);

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900">

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* LOGO */}

        <div className="flex h-[76px] items-center justify-between border-b border-slate-100 px-6">

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-lg shadow-indigo-200">
              <GraduationCap size={23} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Edu<span className="text-indigo-600">Core</span>
              </h1>

              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Management OS
              </p>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>

        </div>

        {/* WORKSPACE */}

        <div className="px-5 pt-7">

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Workspace
          </p>

          <nav className="space-y-1">

            <SidebarItem
              active
              icon={<LayoutDashboard size={19} />}
              label="Overview"
              to="/"
            />

            <SidebarItem
              icon={<Users size={19} />}
              label="Students"
              to="/students"
            />

            <SidebarItem
              icon={<UserPlus size={19} />}
              label="Add Student"
              to="/create-student"
            />

            <SidebarItem
              icon={<BarChart3 size={19} />}
              label="Analytics"
            />

          </nav>

        </div>

        {/* SYSTEM */}

        <div className="px-5 pt-8">

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            System
          </p>

          <nav className="space-y-1">

            <SidebarItem
              icon={<Settings size={19} />}
              label="Settings"
            />

            <SidebarItem
              icon={<HelpCircle size={19} />}
              label="Support"
            />

          </nav>

        </div>

        {/* BOTTOM CARD */}

        <div className="mt-auto p-5">

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 p-5 text-white">

            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/30 blur-2xl" />

            <div className="relative">

              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                <Sparkles size={18} className="text-indigo-200" />
              </div>

              <p className="text-sm font-bold">
                Pro Workspace
              </p>

              <p className="mt-1 text-xs leading-relaxed text-indigo-200">
                Your workspace is running at full capacity.
              </p>

              <button className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white">
                Explore features
                <ArrowRight size={14} />
              </button>

            </div>

          </div>

        </div>

      </aside>

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ================= MAIN ================= */}

      <main className="lg:pl-[280px]">

        {/* TOPBAR */}

        <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-[#f6f7fb]/90 backdrop-blur-xl">

          <div className="flex h-[76px] items-center justify-between px-4 md:px-8">

            <div className="flex items-center gap-4">

              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 lg:hidden"
              >
                <Menu size={20} />
              </button>

              <div className="hidden md:block">

                <p className="text-xs font-medium text-slate-400">
                  Workspace
                </p>

                <div className="flex items-center gap-2">

                  <span className="font-semibold text-slate-800">
                    Student Management
                  </span>

                  <ChevronDown size={16} className="text-slate-400" />

                </div>

              </div>

            </div>

            <div className="flex items-center gap-3">

              {/* SEARCH */}

              <div className="hidden lg:flex">

                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex w-[280px] items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-400 shadow-sm transition hover:border-indigo-200 hover:shadow"
                >

                  <div className="flex items-center gap-2">
                    <Search size={17} />
                    Search students...
                  </div>

                  <div className="flex items-center gap-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400">
                    <Command size={11} />
                    K
                  </div>

                </button>
              </div>

              {/* NOTIFICATIONS */}

              <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600">

                <Bell size={19} />

                <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />

              </button>

              {/* USER */}

              <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-sm transition hover:border-indigo-200">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
                  A
                </div>

                <div className="hidden text-left sm:block">

                  <p className="text-sm font-bold text-slate-800">
                    Administrator
                  </p>

                  <p className="text-xs text-slate-400">
                    System Admin
                  </p>

                </div>

                <ChevronDown
                  size={16}
                  className="hidden text-slate-400 sm:block"
                />

              </button>

            </div>

          </div>

        </header>

        {/* ================= CONTENT ================= */}

        <div className="mx-auto max-w-[1600px] p-4 md:p-8">

          {/* PAGE HEADER */}

          <section className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">

            <div>

              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">

                <Activity size={14} />

                Dashboard Overview

              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">

                Good morning,
                <span className="text-indigo-600"> Admin 👋</span>

              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">

                Here is what is happening across your student management
                workspace today.

              </p>

            </div>

            <div className="flex flex-wrap items-center gap-3">

              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600">

                <Download size={17} />

                Export Data

              </button>

              <Link
                to="/create-student"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl"
              >

                <UserPlus size={18} />

                Add New Student

              </Link>

            </div>

          </section>

          {/* ================= HERO ================= */}

          <section className="relative mb-8 overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-[#111c4d] to-violet-950 p-6 text-white shadow-2xl shadow-indigo-200/40 md:p-10">

            {/* Background */}

            <div className="absolute inset-0 opacity-30">

              <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-indigo-500 blur-[100px]" />

              <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-500 blur-[120px]" />

            </div>

            <div className="relative grid gap-10 xl:grid-cols-[1.4fr_1fr] xl:items-center">

              {/* HERO CONTENT */}

              <div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-indigo-100 backdrop-blur-xl">

                  <Zap size={14} className="text-amber-300" />

                  Everything is running smoothly

                </div>

                <h2 className="mt-6 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">

                  Your academic operations,

                  <span className="block bg-gradient-to-r from-indigo-300 via-violet-200 to-fuchsia-300 bg-clip-text text-transparent">

                    beautifully organized.

                  </span>

                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-indigo-100 md:text-base">

                  Manage students, monitor your database and keep your academic
                  ecosystem organized from one centralized workspace.

                </p>

                <div className="mt-8 flex flex-wrap gap-3">

                  <Link
                    to="/students"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-indigo-50"
                  >

                    Explore Students

                    <ArrowUpRight size={17} />

                  </Link>

                  <Link
                    to="/create-student"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                  >

                    <UserPlus size={17} />

                    Register Student

                  </Link>

                </div>

              </div>

              {/* HERO METRICS */}

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">

                <HeroMetric
                  icon={<Users size={20} />}
                  label="Total Students"
                  value={students.length}
                  detail="Active database records"
                />

                <HeroMetric
                  icon={<TrendingUp size={20} />}
                  label="Average Age"
                  value={averageAge || "--"}
                  detail="Across all students"
                />

                <HeroMetric
                  icon={<ShieldCheck size={20} />}
                  label="Platform Status"
                  value="Operational"
                  detail="All services running"
                  success
                />

              </div>

            </div>

          </section>

          {/* ================= STATS ================= */}

          <section className="mb-8 grid gap-5 sm:grid-cols-2 2xl:grid-cols-4">

            <StatCard
              title="Total Students"
              value={students.length}
              description="All registered students"
              trend="+12.5%"
              icon={<Users size={21} />}
            />

            <StatCard
              title="Average Age"
              value={averageAge || "--"}
              description="Student demographic"
              trend="Updated live"
              icon={<TrendingUp size={21} />}
            />

            <StatCard
              title="New Registrations"
              value={students.length}
              description="Current database records"
              trend="+8.2%"
              icon={<UserPlus size={21} />}
            />

            <StatCard
              title="Data Health"
              value="98%"
              description="System data integrity"
              trend="Healthy"
              icon={<Database size={21} />}
            />

          </section>

          {/* ================= ANALYTICS ================= */}

          <section className="mb-8 grid gap-6 xl:grid-cols-[1.6fr_1fr]">

            {/* GROWTH CHART */}

            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm md:p-7">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                      <BarChart3 size={19} />

                    </div>

                    <div>

                      <h2 className="font-bold text-slate-900">

                        Student Growth

                      </h2>

                      <p className="text-xs text-slate-400">

                        Database growth overview

                      </p>

                    </div>

                  </div>

                </div>

                <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 hover:border-indigo-200 hover:text-indigo-600">

                  Last 7 months

                  <ChevronDown size={14} />

                </button>

              </div>

              {/* CHART */}

              <div className="mt-10">

                <div className="flex h-[240px] items-end gap-3 md:gap-5">

                  {chartData.map((value, index) => {

                    const height =
                      (value / maxChartValue) * 100;

                    return (
                      <div
                        key={index}
                        className="group flex h-full flex-1 flex-col justify-end"
                      >

                        <div className="mb-3 text-center text-xs font-bold text-slate-400 opacity-0 transition group-hover:opacity-100">
                          {value}
                        </div>

                        <div
                          style={{ height: `${Math.max(height, 8)}%` }}
                          className="relative rounded-t-2xl bg-gradient-to-t from-indigo-600 to-violet-400 transition-all duration-500 group-hover:from-violet-600 group-hover:to-fuchsia-400"
                        >

                          <div className="absolute inset-x-0 top-0 h-10 rounded-t-2xl bg-white/10" />

                        </div>

                      </div>
                    );
                  })}

                </div>

                <div className="mt-4 grid grid-cols-7 gap-3 text-center text-[10px] font-semibold text-slate-400 md:gap-5">

                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>

                </div>

              </div>

            </div>

            {/* SYSTEM ACTIVITY */}

            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="font-bold text-slate-900">

                    System Activity

                  </h2>

                  <p className="mt-1 text-xs text-slate-400">

                    Live workspace status

                  </p>

                </div>

                <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">

                  <MoreHorizontal size={20} />

                </button>

              </div>

              <div className="mt-7 space-y-6">

                <ActivityItem
                  icon={<UserPlus size={17} />}
                  title="Student registration"
                  text={`${students.length} records available`}
                  time="Live"
                />

                <ActivityItem
                  icon={<Database size={17} />}
                  title="Database synced"
                  text="All records synchronized"
                  time="Just now"
                />

                <ActivityItem
                  icon={<ShieldCheck size={17} />}
                  title="System health check"
                  text="All services operational"
                  time="2 min ago"
                />

                <ActivityItem
                  icon={<CircleDollarSign size={17} />}
                  title="Workspace analytics"
                  text="Insights generated successfully"
                  time="Today"
                />

              </div>

              <button className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600">

                View Activity Log

                <ArrowRight size={16} />

              </button>

            </div>

          </section>

          {/* ================= STUDENTS TABLE ================= */}

          <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">

            {/* TABLE HEADER */}

            <div className="flex flex-col gap-5 border-b border-slate-100 p-6 md:flex-row md:items-center md:justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">

                    <Users size={19} />

                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">

                      Recent Students

                    </h2>

                    <p className="text-xs text-slate-400">

                      Latest additions to your workspace

                    </p>

                  </div>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 hover:border-indigo-200">

                  <Filter size={15} />

                  Filter

                </button>

                <Link
                  to="/students"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-600"
                >

                  View All

                  <ArrowUpRight size={15} />

                </Link>

              </div>

            </div>

            {/* LOADING */}

            {loading ? (

              <div className="flex min-h-[360px] flex-col items-center justify-center">

                <div className="relative">

                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />

                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">

                  Loading workspace data...

                </p>

              </div>

            ) : students.length === 0 ? (

              <div className="flex min-h-[400px] flex-col items-center justify-center px-6 text-center">

                <div className="relative">

                  <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-indigo-50 to-violet-100 text-indigo-600 shadow-lg shadow-indigo-100">

                    <Users size={34} />

                  </div>

                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg">

                    <UserPlus size={15} />

                  </div>

                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">

                  Your workspace is ready

                </h3>

                <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">

                  Start building your student database by registering your first
                  student.

                </p>

                <Link
                  to="/create-student"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5"
                >

                  <UserPlus size={17} />

                  Add Your First Student

                </Link>

              </div>

            ) : (

              <div className="divide-y divide-slate-100">

                {recentStudents.map((student, index) => (

                  <div
                    key={student.id || index}
                    className="group flex flex-col gap-4 px-6 py-5 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
                  >

                    {/* STUDENT */}

                    <div className="flex min-w-0 items-center gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-lg shadow-indigo-100">

                        {student.name?.charAt(0)?.toUpperCase() || "S"}

                      </div>

                      <div className="min-w-0">

                        <p className="truncate font-bold text-slate-800">

                          {student.name}

                        </p>

                        <p className="mt-1 truncate text-sm text-slate-400">

                          {student.email}

                        </p>

                      </div>

                    </div>

                    {/* META */}

                    <div className="flex items-center justify-between gap-8 md:justify-end">

                      <div className="hidden sm:block">

                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">

                          Age

                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">

                          {student.age || "--"}

                        </p>

                      </div>

                      <div className="hidden lg:block">

                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">

                          Status

                        </p>

                        <div className="mt-1 flex items-center gap-2">

                          <span className="h-2 w-2 rounded-full bg-emerald-500" />

                          <span className="text-sm font-semibold text-emerald-600">

                            Active

                          </span>

                        </div>

                      </div>

                      <button className="rounded-xl border border-transparent p-2.5 text-slate-400 transition hover:border-slate-200 hover:bg-white hover:text-slate-700">

                        <MoreHorizontal size={20} />

                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

          {/* FOOTER */}

          <footer className="flex flex-col gap-3 py-8 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">

            <p>
              © 2026 EduCore. Student Management Platform.
            </p>

            <div className="flex items-center gap-5">

              <span className="flex items-center gap-2">

                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                All systems operational

              </span>

              <span>
                Last updated just now
              </span>

            </div>

          </footer>

        </div>

      </main>

      {/* SEARCH MODAL */}

      {searchOpen && (

        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/40 p-4 pt-24 backdrop-blur-sm">

          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

            <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">

              <Search size={20} className="text-slate-400" />

              <input
                autoFocus
                placeholder="Search students..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />

              <button
                onClick={() => setSearchOpen(false)}
                className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500"
              >
                ESC
              </button>

            </div>

            <div className="p-5">

              <p className="text-xs font-semibold text-slate-400">

                Search across your student database

              </p>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* ================= COMPONENTS ================= */


function SidebarItem({
  icon,
  label,
  active = false,
  to,
}) {
  const content = (
    <>
      {icon}
      <span>{label}</span>
    </>
  );

  const className = `
    flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition
    ${
      active
        ? "bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    }
  `;

  if (to) {
    return (
      <Link to={to} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button className={`${className} w-full text-left`}>
      {content}
    </button>
  );
}


function StatCard({
  title,
  value,
  description,
  trend,
  icon,
}) {
  return (
    <div className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">

      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-50 opacity-0 blur-2xl transition group-hover:opacity-100" />

      <div className="relative">

        <div className="flex items-start justify-between">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">

            {icon}

          </div>

          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">

            <TrendingUp size={11} />

            {trend}

          </div>

        </div>

        <div className="mt-7">

          <p className="text-3xl font-bold tracking-tight text-slate-900">

            {value}

          </p>

          <p className="mt-2 font-bold text-slate-700">

            {title}

          </p>

          <p className="mt-1 text-xs text-slate-400">

            {description}

          </p>

        </div>

      </div>

    </div>
  );
}


function HeroMetric({
  icon,
  label,
  value,
  detail,
  success = false,
}) {
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl transition hover:bg-white/[0.12]">

      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          success
            ? "bg-emerald-500/20 text-emerald-300"
            : "bg-indigo-500/20 text-indigo-200"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-xs font-medium text-indigo-200">

          {label}

        </p>

        <p className="mt-1 truncate text-xl font-bold text-white">

          {value}

        </p>

        <p className="mt-1 text-[11px] text-indigo-300">

          {detail}

        </p>

      </div>

    </div>
  );
}


function ActivityItem({
  icon,
  title,
  text,
  time,
}) {
  return (
    <div className="flex gap-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-indigo-600">

        {icon}

      </div>

      <div className="min-w-0 flex-1">

        <div className="flex items-start justify-between gap-3">

          <div>

            <p className="text-sm font-bold text-slate-700">

              {title}

            </p>

            <p className="mt-1 text-xs text-slate-400">

              {text}

            </p>

          </div>

          <span className="whitespace-nowrap text-[10px] font-semibold text-slate-400">

            {time}

          </span>

        </div>

      </div>

    </div>
  );
}