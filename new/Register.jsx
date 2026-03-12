import React, { useState } from "react";

function Register({ setUserRole, setPage, setGrade }) {
  const [role, setRole] = useState("student");
  const [gradeSelect, setGradeSelect] = useState("7A");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setGrade(gradeSelect);
    setUserRole(role);
  };

  return (
    <div className="container">
      <h2>Бүртгүүлэх</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Нэр"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Нэвтрэх нэр"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Нууц үг"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Сурагч</option>
          <option value="teacher">Багш</option>
        </select>

        {role === "student" && (
          <select value={gradeSelect} onChange={(e) => setGradeSelect(e.target.value)}>
            <option value="7A">7-р анги A бүлэг</option>
            <option value="7B">7-р анги B бүлэг</option>
            <option value="7C">7-р анги C бүлэг</option>
          </select>
        )}

        <button type="submit">Бүртгүүлэх</button>
      </form>

      <p>
        Буцах уу?{" "}
        <button onClick={() => setPage("login")}>Нэвтрэх</button>
      </p>
    </div>
  );
}

export default Register;