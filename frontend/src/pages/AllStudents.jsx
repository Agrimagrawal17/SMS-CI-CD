import { useEffect, useMemo, useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Mail,
  Calendar,
  RefreshCw,
  ArrowUpDown,
  AlertCircle,
  Database,
  Pencil,
  Trash2,
  X,
  Loader2,
  Save,
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  MoreHorizontal,
  GraduationCap,
  LayoutDashboard,
  Settings,
  HelpCircle,
  Menu,
  Bell,
  Command,
  CheckCircle2,
  User,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  getStudents,
  updateStudent,
  deleteStudent,
} from "../api/api";


export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");


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

    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  const handleRefresh = async () => {
    setRefreshing(true);

    await fetchStudents();
  };


  const filteredStudents = useMemo(() => {
    let result = [...students];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((student) =>
        student.name?.toLowerCase().includes(query) ||
        student.email?.toLowerCase().includes(query) ||
        String(student.age || "").includes(query)
      );
    }

    result.sort((a, b) => {
      if (sortOrder === "oldest") {
        return a.id - b.id;
      }

      if (sortOrder === "name") {
        return (a.name || "").localeCompare(b.name || "");
      }

      return b.id - a.id;
    });

    return result;
  }, [students, search, sortOrder]);


  const openEditModal = (student) => {
    setSelectedStudent(student);

    setEditData({
      name: student.name || "",
      email: student.email || "",
      age: student.age || "",
    });

    setActionError("");
    setEditModal(true);
  };


  const openDeleteModal = (student) => {
    setSelectedStudent(student);

    setActionError("");
    setDeleteModal(true);
  };


  const closeEditModal = () => {
    if (actionLoading) return;

    setEditModal(false);
    setSelectedStudent(null);
    setActionError("");
  };


  const closeDeleteModal = () => {
    if (actionLoading) return;

    setDeleteModal(false);
    setSelectedStudent(null);
    setActionError("");
  };


  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setActionError("");
  };


  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editData.name.trim()) {
      setActionError("Student name is required.");
      return;
    }

    if (!editData.email.trim()) {
      setActionError("Email address is required.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        editData.email
      )
    ) {
      setActionError("Please enter a valid email address.");
      return;
    }

    if (
      !editData.age ||
      Number(editData.age) <= 0 ||
      Number(editData.age) > 120
    ) {
      setActionError("Please enter a valid age.");
      return;
    }

    try {
      setActionLoading(true);
      setActionError("");

      await updateStudent(selectedStudent.id, {
        name: editData.name.trim(),
        email: editData.email.trim(),
        age: Number(editData.age),
      });

      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === selectedStudent.id
            ? {
                ...student,
                name: editData.name.trim(),
                email: editData.email.trim(),
                age: Number(editData.age),
              }
            : student
        )
      );

      setEditModal(false);
      setSelectedStudent(null);

    } catch (err) {
      console.error("Failed to update student:", err);

      setActionError(
        err.response?.data?.detail ||
          "Unable to update student. Please try again."
      );

    } finally {
      setActionLoading(false);
    }
  };


  const handleDelete = async () => {
    try {
      setActionLoading(true);
      setActionError("");

      await deleteStudent(selectedStudent.id);

      setStudents((prevStudents) =>
        prevStudents.filter(
          (student) =>
            student.id !== selectedStudent.id
        )
      );

      setDeleteModal(false);
      setSelectedStudent(null);

    } catch (err) {
      console.error("Failed to delete student:", err);

      setActionError(
        err.response?.data?.detail ||
          "Unable to delete student. Please try again."
      );

    } finally {
      setActionLoading(false);
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

        <div className="flex h-[76px] items-center justify-between border-b border-slate-100 px-6">

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-lg shadow-indigo-200">

              <GraduationCap size={23} />

            </div>


            <div>

              <h1 className="text-lg font-bold tracking-tight text-slate-900">

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
            onClick={() =>
              setSidebarOpen(false)
            }
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
          >

            <X size={20} />

          </button>

        </div>


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
              active
              icon={<Users size={19} />}
              label="Students"
              to="/students"
            />

            <SidebarItem
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


        <div className="mt-auto p-5">

          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">

                <Database size={19} />

              </div>


              <div>

                <p className="text-sm font-bold text-slate-800">

                  Student Database

                </p>

                <p className="text-xs text-slate-500">

                  {students.length} records stored

                </p>

              </div>

            </div>

          </div>

        </div>

      </aside>


      {/* MOBILE OVERLAY */}

      {sidebarOpen && (

        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />

      )}


      {/* ================= MAIN ================= */}

      <main className="lg:pl-[280px]">


        {/* ================= TOPBAR ================= */}

        <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-[#f6f7fb]/90 backdrop-blur-xl">

          <div className="flex h-[76px] items-center justify-between px-4 md:px-8">

            <div className="flex items-center gap-4">

              <button
                onClick={() =>
                  setSidebarOpen(true)
                }
                className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 lg:hidden"
              >

                <Menu size={20} />

              </button>


              <div>

                <p className="text-xs font-medium text-slate-400">

                  Student Management

                </p>

                <div className="flex items-center gap-2">

                  <span className="font-semibold text-slate-800">

                    Student Directory

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


              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-sm">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">

                  A

                </div>


                <div className="hidden sm:block">

                  <p className="text-sm font-bold text-slate-800">

                    Administrator

                  </p>

                  <p className="text-xs text-slate-400">

                    System Admin

                  </p>

                </div>

              </div>

            </div>

          </div>

        </header>


        {/* ================= CONTENT ================= */}

        <div className="mx-auto max-w-[1450px] p-4 md:p-8">


          {/* PAGE HEADER */}

          <section className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">

            <div>

              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">

                <Users size={14} />

                Student Management

              </div>


              <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">

                All Students

              </h1>


              <p className="mt-3 max-w-xl leading-relaxed text-slate-500">

                Manage, update and maintain student records from your
                centralized academic database.

              </p>

            </div>


            <Link
              to="/create-student"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl"
            >

              <UserPlus size={18} />

              Add New Student

            </Link>

          </section>


          {/* ================= STATS ================= */}

          <section className="mb-6 grid gap-4 sm:grid-cols-3">

            <MiniStat
              icon={<Users size={19} />}
              label="Total Students"
              value={students.length}
            />

            <MiniStat
              icon={<Database size={19} />}
              label="Visible Records"
              value={filteredStudents.length}
            />

            <MiniStat
              icon={<CheckCircle2 size={19} />}
              label="Database Status"
              value="Healthy"
              success
            />

          </section>


          {/* ================= TABLE CARD ================= */}

          <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">


            {/* TABLE HEADER */}

            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between md:p-6">

              <div>

                <h2 className="text-lg font-bold text-slate-900">

                  Student Directory

                </h2>

                <p className="mt-1 text-sm text-slate-500">

                  Search, update or remove student records.

                </p>

              </div>


              <div className="flex flex-col gap-3 sm:flex-row">


                {/* SEARCH */}

                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10">

                  <Search
                    size={18}
                    className="text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search students..."
                    className="w-full min-w-[180px] bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />

                </div>


                {/* SORT */}

                <div className="relative">

                  <select
                    value={sortOrder}
                    onChange={(e) =>
                      setSortOrder(e.target.value)
                    }
                    className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-9 text-sm font-semibold text-slate-600 outline-none transition hover:border-indigo-300 focus:border-indigo-500"
                  >

                    <option value="newest">

                      Newest

                    </option>

                    <option value="oldest">

                      Oldest

                    </option>

                    <option value="name">

                      Name A-Z

                    </option>

                  </select>


                  <ArrowUpDown
                    size={16}
                    className="pointer-events-none absolute left-3 top-3 text-slate-400"
                  />

                </div>


                {/* REFRESH */}

                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-60"
                  title="Refresh students"
                >

                  <RefreshCw
                    size={18}
                    className={
                      refreshing
                        ? "animate-spin"
                        : ""
                    }
                  />

                </button>

              </div>

            </div>


            {/* ================= LOADING ================= */}

            {loading ? (

              <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">

                <Loader2
                  size={34}
                  className="animate-spin text-indigo-600"
                />

                <div className="text-center">

                  <p className="font-semibold text-slate-700">

                    Loading students

                  </p>

                  <p className="mt-1 text-sm text-slate-400">

                    Retrieving student records...

                  </p>

                </div>

              </div>

            ) : filteredStudents.length === 0 ? (

              /* ================= EMPTY STATE ================= */

              <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">

                  <Users size={30} />

                </div>


                <h3 className="text-lg font-bold text-slate-900">

                  {search
                    ? "No students found"
                    : "No students yet"}

                </h3>


                <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">

                  {search
                    ? "Try adjusting your search to find the student you are looking for."
                    : "Start building your student database by adding your first student."}

                </p>


                {!search && (

                  <Link
                    to="/create-student"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200"
                  >

                    <UserPlus size={17} />

                    Add First Student

                  </Link>

                )}

              </div>

            ) : (

              /* ================= TABLE ================= */

              <div className="overflow-x-auto">

                <table className="w-full min-w-[850px]">

                  <thead>

                    <tr className="border-b border-slate-100 bg-slate-50/70">

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">

                        Student

                      </th>


                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">

                        Email

                      </th>


                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">

                        Age

                      </th>


                      <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-400">

                        Actions

                      </th>

                    </tr>

                  </thead>


                  <tbody className="divide-y divide-slate-100">

                    {filteredStudents.map((student) => (

                      <tr
                        key={student.id}
                        className="group transition hover:bg-slate-50/80"
                      >


                        {/* STUDENT */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-4">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 font-bold text-white shadow-sm">

                              {student.name
                                ?.charAt(0)
                                ?.toUpperCase() || "S"}

                            </div>


                            <div>

                              <p className="font-bold text-slate-800">

                                {student.name}

                              </p>


                              <p className="mt-1 text-xs text-slate-400">

                                Student ID #{student.id}

                              </p>

                            </div>

                          </div>

                        </td>


                        {/* EMAIL */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2 text-sm text-slate-600">

                            <Mail
                              size={16}
                              className="text-slate-400"
                            />

                            {student.email}

                          </div>

                        </td>


                        {/* AGE */}

                        <td className="px-6 py-5">

                          <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600">

                            <Calendar size={15} />

                            {student.age}

                          </span>

                        </td>


                        {/* ACTIONS */}

                        <td className="px-6 py-5">

                          <div className="flex items-center justify-end gap-2">


                            {/* UPDATE */}

                            <button
                              onClick={() =>
                                openEditModal(student)
                              }
                              className="inline-flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-3.5 py-2 text-xs font-bold text-indigo-600 transition hover:border-indigo-200 hover:bg-indigo-600 hover:text-white"
                            >

                              <Pencil size={15} />

                              Update

                            </button>


                            {/* DELETE */}

                            <button
                              onClick={() =>
                                openDeleteModal(student)
                              }
                              className="inline-flex items-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-600 transition hover:border-rose-200 hover:bg-rose-600 hover:text-white"
                            >

                              <Trash2 size={15} />

                              Delete

                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}


            {/* TABLE FOOTER */}

            {!loading &&
              filteredStudents.length > 0 && (

                <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

                  <p>

                    Showing{" "}

                    <span className="font-bold text-slate-700">

                      {filteredStudents.length}

                    </span>

                    {" "}of{" "}

                    <span className="font-bold text-slate-700">

                      {students.length}

                    </span>

                    {" "}students

                  </p>


                  <div className="flex items-center gap-2 text-xs text-emerald-600">

                    <span className="h-2 w-2 rounded-full bg-emerald-500" />

                    Database connected

                  </div>

                </div>

              )}

          </section>


          {/* FOOTER */}

          <footer className="flex flex-col gap-3 py-8 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">

            <p>

              EduCore Student Management Platform

            </p>


            <p>

              Secure centralized student database

            </p>

          </footer>

        </div>

      </main>


      {/* ================= UPDATE MODAL ================= */}

      {editModal &&
        selectedStudent && (

          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

            <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">


              {/* HEADER */}

              <div className="flex items-center justify-between border-b border-slate-100 p-6">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">

                    <Pencil size={21} />

                  </div>


                  <div>

                    <h2 className="text-lg font-bold text-slate-900">

                      Update Student

                    </h2>

                    <p className="mt-1 text-sm text-slate-500">

                      Modify student information and save changes.

                    </p>

                  </div>

                </div>


                <button
                  onClick={closeEditModal}
                  disabled={actionLoading}
                  className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                >

                  <X size={20} />

                </button>

              </div>


              {/* FORM */}

              <form
                onSubmit={handleUpdate}
                className="p-6"
              >

                {actionError && (

                  <div className="mb-5 flex items-center gap-3 rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">

                    <AlertCircle size={18} />

                    {actionError}

                  </div>

                )}


                <div className="space-y-5">


                  {/* NAME */}

                  <EditField
                    label="Student Name"
                    icon={<User size={18} />}
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    placeholder="Student name"
                  />


                  {/* EMAIL */}

                  <EditField
                    label="Email Address"
                    icon={<Mail size={18} />}
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleEditChange}
                    placeholder="student@example.com"
                  />


                  {/* AGE */}

                  <EditField
                    label="Age"
                    icon={<Calendar size={18} />}
                    type="number"
                    name="age"
                    value={editData.age}
                    onChange={handleEditChange}
                    placeholder="Student age"
                  />

                </div>


                {/* ACTIONS */}

                <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-6">

                  <button
                    type="button"
                    onClick={closeEditModal}
                    disabled={actionLoading}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                  >

                    Cancel

                  </button>


                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                  >

                    {actionLoading ? (

                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />

                        Saving...

                      </>

                    ) : (

                      <>
                        <Save size={17} />

                        Save Changes

                      </>

                    )}

                  </button>

                </div>

              </form>

            </div>

          </div>

        )}


      {/* ================= DELETE MODAL ================= */}

      {deleteModal &&
        selectedStudent && (

          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl">


              {/* ICON */}

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">

                <AlertTriangle size={27} />

              </div>


              <h2 className="mt-6 text-xl font-bold text-slate-900">

                Delete Student?

              </h2>


              <p className="mt-3 leading-relaxed text-slate-500">

                You are about to permanently delete{" "}

                <span className="font-bold text-slate-800">

                  {selectedStudent.name}

                </span>

                {" "}from your student database.

              </p>


              {/* WARNING */}

              <div className="mt-5 rounded-xl border border-rose-100 bg-rose-50 p-4">

                <p className="text-sm font-bold text-rose-700">

                  This action cannot be undone.

                </p>

                <p className="mt-1 text-xs leading-relaxed text-rose-600">

                  The student record and its associated information will be
                  permanently removed.

                </p>

              </div>


              {/* ERROR */}

              {actionError && (

                <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-100 bg-rose-50 p-3 text-sm text-rose-700">

                  <AlertCircle size={17} />

                  {actionError}

                </div>

              )}


              {/* ACTIONS */}

              <div className="mt-7 flex gap-3">

                <button
                  onClick={closeDeleteModal}
                  disabled={actionLoading}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >

                  Cancel

                </button>


                <button
                  onClick={handleDelete}
                  disabled={actionLoading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
                >

                  {actionLoading ? (

                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Deleting...

                    </>

                  ) : (

                    <>
                      <Trash2 size={17} />

                      Delete

                    </>

                  )}

                </button>

              </div>

            </div>

          </div>

        )}

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
    flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition
    ${
      active
        ? "bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    }
  `;

  if (to) {
    return (
      <Link
        to={to}
        className={className}
      >
        {icon}
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button
      className={className}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}


/* ================= MINI STAT ================= */

function MiniStat({
  icon,
  label,
  value,
  success = false,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

          {icon}

        </div>


        {success && (

          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

        )}

      </div>


      <p className="mt-5 text-2xl font-bold tracking-tight text-slate-900">

        {value}

      </p>


      <p className="mt-1 text-sm text-slate-500">

        {label}

      </p>

    </div>
  );
}


/* ================= EDIT FIELD ================= */

function EditField({
  label,
  icon,
  type,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-bold text-slate-700">

        {label}

      </label>


      <div className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10">

        <div className="text-slate-400 transition group-focus-within:text-indigo-600">

          {icon}

        </div>


        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={type === "number" ? "1" : undefined}
          className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
        />

      </div>

    </div>
  );
}

