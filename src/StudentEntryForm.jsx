import React, { useState } from "react";

// StudentEntryForm.jsx
// Single-file React component for a teacher to add students.
// Tailwind CSS classes are used for styling (no imports required here).

export default function StudentEntryForm() {
  const [form, setForm] = useState({ name: "", age: "", grade: "" });
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // simple validation: all fields required
    if (!form.name.trim() || !form.age.trim() || !form.grade.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    // Age must be a number
    const ageNum = Number(form.age);
    if (Number.isNaN(ageNum) || ageNum <= 0) {
      setError("Please enter a valid age.");
      return;
    }

    setStudents((prev) => [...prev, { ...form, age: String(ageNum) }]);
    setForm({ name: "", age: "", grade: "" });
    setError("");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Student Entry Form</h1>
          <p className="text-sm text-gray-500">Add students and review the list below.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div className="col-span-1 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Aisha Patel"
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="col-span-1 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="e.g. 12"
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="col-span-1 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
            <input
              name="grade"
              value={form.grade}
              onChange={handleChange}
              placeholder="e.g. 7"
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="col-span-1 sm:col-span-3">
            {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 mr-2"
            >
              Add Student
            </button>
            <button
              type="button"
              onClick={() => setForm({ name: "", age: "", grade: "" })}
              className="inline-flex items-center px-4 py-2 rounded-lg border font-medium hover:bg-gray-100"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Students list (shows after adding) */}
        <div className="mt-8">
          {students.length === 0 ? (
            <div className="text-sm text-gray-500">No students added yet.</div>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-3">Students</h2>
              <div className="grid grid-cols-1 gap-3">
                {students.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between border rounded-xl p-3">
                    <div>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-sm text-gray-500">Age: {s.age} • Grade: {s.grade}</div>
                    </div>
                    <div>
                      <button
                        onClick={() => setStudents((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-sm px-3 py-1 rounded-lg border hover:bg-gray-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Usage: import StudentEntryForm from './StudentEntryForm';
// Then render <StudentEntryForm /> inside your App component.
