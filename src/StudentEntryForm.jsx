import React, { useState } from "react";
import "./StudentEntryForm.css";

export default function StudentEntryForm() {
  const [form, setForm] = useState({ name: "", age: "", grade: "" });
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.age || !form.grade) {
      setError("Please fill all fields");
      return;
    }

    const ageNum = Number(form.age);
    if (!ageNum || ageNum <= 0) {
      setError("Age must be a valid number");
      return;
    }

    setStudents([...students, form]);
    setForm({ name: "", age: "", grade: "" });
    setError("");
  };

  const clearForm = () => {
    setForm({ name: "", age: "", grade: "" });
    setError("");
  };

  return (
    <div className="container">
      <h2>Student Entry Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            name="name"
            placeholder="Enter name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            name="age"
            placeholder="Enter age"
            value={form.age}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Grade:</label>
          <input
            name="grade"
            placeholder="Enter grade"
            value={form.grade}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="add-btn">Add Student</button>
        <button type="button" onClick={clearForm} className="clear-btn">Clear</button>
      </form>

      <div className="students-list">
        <h3>Students</h3>
        {students.length === 0 ? (
          <p>No students added</p>
        ) : (
          <ul>
            {students.map((student, index) => (
              <li key={index}>
                {student.name} - Age: {student.age}, Grade: {student.grade}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
