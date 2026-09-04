import { useMemo, useState } from "react";
import {
  UserPlus,
  User,
  Mail,
  Calendar,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  LayoutDashboard,
  Users,
  Settings,
  HelpCircle,
  ChevronDown,
  Menu,
  X,
  Command,
  Search,
  Bell,
  CircleCheck,
  Database,
  ArrowRight,
  Clock3,
  CircleUserRound,
  Info,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { createStudent } from "../api/api";

export default function CreateStudent() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    age: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const errors = useMemo(() => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Student name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must contain at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.age) {
      newErrors.age = "Student age is required";
    } else if (
      Number(formData.age) <= 0 ||
      Number(formData.age) > 120
    ) {
      newErrors.age = "Enter a valid age between 1 and 120";
    }

    return newErrors;
  }, [formData]);

  const completedFields = useMemo(() => {
    let completed = 0;

    if (formData.name.trim() && !errors.name) completed++;
    if (formData.email.trim() && !errors.email) completed++;
    if (formData.age && !errors.age) completed++;

    return completed;
  }, [formData, errors]);

  const progress = Math.round(
    (completedFields / 3) * 100
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setMessage("");
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      age: true,
    });

    if (Object.keys(errors).length > 0) {
      setError(
        "Please correct the highlighted fields before continuing."
      );
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await createStudent({
        name: formData.name.trim(),
        email: formData.email.trim(),
        age: Number(formData.age),
      });

      setMessage(
        response?.message ||
          response?.Message ||
          "Student registered successfully!"
      );

      setTimeout(() => {
        navigate("/students");
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to create student. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb]">

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* BRAND */}

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

                Edu<span className="text-indigo-600">
                  Core
                </span>

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

        {/* NAVIGATION */}

        <div className="px-5 pt-7">

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">

            Workspace

          </p>

          <nav className="space-y-1">

            <SidebarItem
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
              active
              icon={<UserPlus size={19} />}
              label="Add Student"
              to="/create-student"
            />

          </nav>

        </div>

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

        {/* BOTTOM */}

        <div className="mt-auto p-5">

          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">

                <ShieldCheck size={19} />

              </div>

              <div>

                <p className="text-sm font-bold text-slate-800">

                  Secure Workspace

                </p>

                <p className="text-xs text-slate-500">

                  Data protection enabled

                </p>

              </div>

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

                  Student Management

                </p>

                <div className="flex items-center gap-2">

                  <span className="font-semibold text-slate-800">

                    Registration Center

                  </span>

                  <ChevronDown
                    size={16}
                    className="text-slate-400"
                  />

                </div>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <button className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-400 shadow-sm lg:flex">

                <Search size={17} />

                Search

                <span className="ml-4 flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 text-[10px]">

                  <Command size={11} />

                  K

                </span>

              </button>

              <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm hover:text-indigo-600">

                <Bell size={19} />

                <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />

              </button>

              <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-sm">

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

              </button>

            </div>

          </div>

        </header>

        {/* ================= PAGE ================= */}

        <div className="mx-auto max-w-[1450px] p-4 md:p-8">

          {/* BREADCRUMB */}

          <Link
            to="/students"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
          >

            <ArrowLeft size={17} />

            Back to Students

          </Link>

          {/* HEADER */}

          <section className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">

            <div>

              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">

                <Sparkles size={14} />

                Registration Center

              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">

                Add a new student

              </h1>

              <p className="mt-3 max-w-xl leading-relaxed text-slate-500">

                Create a student profile and securely add their information
                to your centralized academic database.

              </p>

            </div>

            {/* PROGRESS */}

            <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-semibold text-slate-500">

                    Registration Progress

                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">

                    {completedFields} of 3 fields completed

                  </p>

                </div>

                <div className="text-lg font-bold text-indigo-600">

                  {progress}%

                </div>

              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">

                <div
                  style={{ width: `${progress}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-500"
                />

              </div>

            </div>

          </section>

          {/* ================= CONTENT GRID ================= */}

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">

            {/* ================= FORM ================= */}

            <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">

              {/* FORM HEADER */}

              <div className="border-b border-slate-100 p-6 md:p-8">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-100">

                    <UserPlus size={22} />

                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-slate-900">

                      Student Information

                    </h2>

                    <p className="mt-1 text-sm text-slate-500">

                      Enter the primary details required to create a student
                      profile.

                    </p>

                  </div>

                </div>

              </div>

              {/* ALERTS */}

              <div className="px-6 md:px-8">

                {message && (

                  <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">

                    <CheckCircle2 size={20} />

                    <div>

                      <p className="font-bold">

                        Student created successfully

                      </p>

                      <p className="mt-0.5 text-xs text-emerald-600">

                        Redirecting you to the student directory...

                      </p>

                    </div>

                  </div>

                )}

                {error && (

                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">

                    <AlertCircle
                      size={20}
                      className="mt-0.5 shrink-0"
                    />

                    <div>

                      <p className="font-bold">

                        Unable to continue

                      </p>

                      <p className="mt-1 text-xs">

                        {error}

                      </p>

                    </div>

                  </div>

                )}

              </div>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8"
              >

                <div className="space-y-7">

                  <FormField
                    label="Student Name"
                    description="Enter the student's full legal name."
                    icon={<User size={19} />}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Rahul Sharma"
                    error={
                      touched.name
                        ? errors.name
                        : ""
                    }
                  />

                  <FormField
                    label="Email Address"
                    description="Used as the primary student contact."
                    icon={<Mail size={19} />}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="student@example.com"
                    error={
                      touched.email
                        ? errors.email
                        : ""
                    }
                  />

                  <FormField
                    label="Student Age"
                    description="Enter the student's current age."
                    icon={<Calendar size={19} />}
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. 21"
                    error={
                      touched.age
                        ? errors.age
                        : ""
                    }
                  />

                </div>

                {/* ACTIONS */}

                <div className="mt-10 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">

                  <Link
                    to="/students"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >

                    Cancel

                  </Link>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                  >

                    {loading ? (
                      <>
                        <Loader2
                          size={19}
                          className="animate-spin"
                        />

                        Creating Student...

                      </>
                    ) : (
                      <>
                        <UserPlus size={19} />

                        Create Student

                        <ArrowRight size={17} />

                      </>
                    )}

                  </button>

                </div>

              </form>

            </section>

            {/* ================= LIVE PREVIEW ================= */}

            <aside className="space-y-6">

              {/* PROFILE PREVIEW */}

              <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-6 text-white shadow-xl md:p-8">

                {/* BACKGROUND */}

                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/30 blur-3xl" />

                <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />

                <div className="relative">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">

                      <CircleUserRound size={15} />

                      Live Preview

                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">

                      <span className="h-2 w-2 rounded-full bg-emerald-400" />

                      Draft

                    </div>

                  </div>

                  {/* AVATAR */}

                  <div className="mt-10 flex flex-col items-center text-center">

                    <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/20 bg-gradient-to-br from-indigo-400 to-violet-500 text-3xl font-bold shadow-2xl">

                      {formData.name
                        ?.charAt(0)
                        ?.toUpperCase() || "S"}

                    </div>

                    <h3 className="mt-5 text-xl font-bold">

                      {formData.name || "Student Name"}

                    </h3>

                    <p className="mt-1 text-sm text-indigo-200">

                      {formData.email || "student@example.com"}

                    </p>

                  </div>

                  {/* PREVIEW DATA */}

                  <div className="mt-10 space-y-3">

                    <PreviewRow
                      icon={<User size={16} />}
                      label="Full Name"
                      value={
                        formData.name ||
                        "Not provided"
                      }
                    />

                    <PreviewRow
                      icon={<Mail size={16} />}
                      label="Email"
                      value={
                        formData.email ||
                        "Not provided"
                      }
                    />

                    <PreviewRow
                      icon={<Calendar size={16} />}
                      label="Age"
                      value={
                        formData.age
                          ? `${formData.age} years`
                          : "Not provided"
                      }
                    />

                  </div>

                </div>

              </div>

              {/* SECURITY */}

              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                    <ShieldCheck size={20} />

                  </div>

                  <div>

                    <h3 className="font-bold text-slate-800">

                      Secure Data Handling

                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-500">

                      Student information is processed and stored securely
                      within your centralized database.

                    </p>

                  </div>

                </div>

              </div>

              {/* CHECKLIST */}

              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                    <CircleCheck size={19} />

                  </div>

                  <div>

                    <h3 className="font-bold text-slate-800">

                      Registration Checklist

                    </h3>

                    <p className="text-xs text-slate-400">

                      Complete all required information

                    </p>

                  </div>

                </div>

                <div className="mt-6 space-y-4">

                  <ChecklistItem
                    completed={
                      !!formData.name &&
                      !errors.name
                    }
                    label="Student name"
                  />

                  <ChecklistItem
                    completed={
                      !!formData.email &&
                      !errors.email
                    }
                    label="Valid email address"
                  />

                  <ChecklistItem
                    completed={
                      !!formData.age &&
                      !errors.age
                    }
                    label="Student age"
                  />

                </div>

              </div>

              {/* INFO */}

              <div className="flex gap-3 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">

                <Info
                  size={19}
                  className="shrink-0 text-indigo-600"
                />

                <p className="text-xs leading-relaxed text-indigo-700">

                  Once created, the student will immediately become available
                  in your student directory.

                </p>

              </div>

            </aside>

          </div>

          {/* FOOTER */}

          <footer className="flex flex-col gap-3 py-8 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">

            <p>
              EduCore Student Management Platform
            </p>

            <div className="flex items-center gap-2">

              <Clock3 size={14} />

              Registration session active

            </div>

          </footer>

        </div>

      </main>

    </div>
  );
}


/* ================= SIDEBAR ITEM ================= */

function SidebarItem({
  icon,
  label,
  active = false,
  to,
}) {
  const className = `
    flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition
    ${
      active
        ? "bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    }
  `;

  const content = (
    <>
      {icon}
      <span>{label}</span>
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={className}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`${className} w-full text-left`}
    >
      {content}
    </button>
  );
}


/* ================= FORM FIELD ================= */

function FormField({
  label,
  description,
  icon,
  type,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
}) {
  const isValid =
    value &&
    !error;

  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <div>

          <label className="text-sm font-bold text-slate-700">

            {label}

          </label>

          <p className="mt-1 text-xs text-slate-400">

            {description}

          </p>

        </div>

        {isValid && (

          <CheckCircle2
            size={17}
            className="text-emerald-500"
          />

        )}

      </div>

      <div
        className={`group flex items-center gap-3 rounded-xl border px-4 py-3.5 transition ${
          error
            ? "border-rose-300 bg-rose-50"
            : isValid
            ? "border-emerald-200 bg-emerald-50/30"
            : "border-slate-200 bg-slate-50 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10"
        }`}
      >

        <div
          className={`transition ${
            error
              ? "text-rose-500"
              : isValid
              ? "text-emerald-500"
              : "text-slate-400 group-focus-within:text-indigo-600"
          }`}
        >

          {icon}

        </div>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
        />

      </div>

      {error && (

        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-600">

          <AlertCircle size={14} />

          {error}

        </div>

      )}

    </div>
  );
}


/* ================= PREVIEW ROW ================= */

function PreviewRow({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.07] p-3 backdrop-blur">

      <div className="text-indigo-300">

        {icon}

      </div>

      <div className="min-w-0">

        <p className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300">

          {label}

        </p>

        <p className="mt-1 truncate text-sm font-semibold text-white">

          {value}

        </p>

      </div>

    </div>
  );
}


/* ================= CHECKLIST ================= */

function ChecklistItem({
  completed,
  label,
}) {
  return (
    <div className="flex items-center gap-3">

      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full ${
          completed
            ? "bg-emerald-500 text-white"
            : "bg-slate-100 text-slate-400"
        }`}
      >

        {completed ? (
          <CheckCircle2 size={15} />
        ) : (
          <div className="h-2 w-2 rounded-full bg-slate-300" />
        )}

      </div>

      <span
        className={`text-sm font-medium ${
          completed
            ? "text-slate-800"
            : "text-slate-400"
        }`}
      >

        {label}

      </span>

    </div>
  );
}

