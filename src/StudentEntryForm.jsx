import React, { useState } from "react";

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

    if (!form.name.trim() || !form.age.trim() || !form.grade.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const ageNum = Number(form.age);
    if (Number.isNaN(ageNum) || ageNum <= 0) {
      setError("Please enter a valid age.");
      return;
    }

    setStudents((prev) => [...prev, { ...form }]);
    setForm({ name: "", age: "", grade: "" });
    setError("");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-8">

        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Student Entry Form</h1>
          <p className="text-sm text-gray-500">Add students and review the list below.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. MS Dhoni"
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="e.g. 14"
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Grade</label>
            <select
              name="grade"
              value={form.grade}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="">Select grade</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div className="col-span-3">
            {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg mr-2">
              Add Student
            </button>

            <button
              type="button"
              onClick={() => {
                setForm({ name: "", age: "", grade: "" });
                setError("");
              }}
              className="border px-4 py-2 rounded-lg"
            >
              Clear
            </button>
          </div>
        </form>

        <div className="mt-8">
          {students.length === 0 ? (
            <div>No students added yet.</div>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-3">Students</h2>

              {students.map((s, idx) => (
                <div key={idx} className="flex justify-between border rounded-xl p-3 mb-2">
                  <div>
                    <div className="font-medium">{s.name}</div>
                    <div className="text-sm text-gray-500">
                      Age: {s.age} • Class {s.grade}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setStudents((prev) => prev.filter((_, i) => i !== idx))
                    }
                    className="border px-3 py-1 rounded-lg text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

      </div>
    </div>
  );
}
