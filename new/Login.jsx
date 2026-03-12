import React, { useState } from "react";

function Login({ setUserRole, setPage }) {
  const [role, setRole] = useState("student");

  const handleLogin = (e) => {
    e.preventDefault();
    setUserRole(role);
  };

  return (
    <div className="container">
      <h2>Нэвтрэх</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Нэвтрэх нэр" required />
        <input type="password" placeholder="Нууц үг" required />

        <select onChange={(e) => setRole(e.target.value)} value={role}>
          <option value="student">Сурагч</option>
          <option value="teacher">Багш</option>
        </select>

        <button type="submit">Нэвтрэх</button>
      </form>

      {/* Бүртгүүлэх товч */}
      <p>
        Бүртгэлгүй юу?{" "}
        <button onClick={() => setPage("register")}>Бүртгүүлэх</button>
      </p>
    </div>
  );
}

export default Login;