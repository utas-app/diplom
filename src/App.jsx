import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Teacher from "./components/Teacher";
import Student from "./components/Student";
import './App.css'
function App() {
  const [userRole, setUserRole] = useState(null);
  const [page, setPage] = useState("login"); // "login" эсвэл "register"
  const [grade, setGrade] = useState("");

  const [materials, setMaterials] = useState([]);
  const [homeworks, setHomeworks] = useState([]);
  const [tests, setTests] = useState([]);

  const resetLogin = () => {
    setUserRole(null);
    setGrade("");
    setPage("login");
  };

  if (page === "register") {
    return (
      <Register
        setUserRole={setUserRole}
        setPage={setPage}
        setGrade={setGrade}
      />
    );
  }

  if (!userRole) {
    return (
      <Login
        setUserRole={setUserRole}
        setPage={setPage} // бүртгүүлэх товч дамжуулах
        setGrade={setGrade}
      />
    );
  }

  if (userRole === "teacher") {
    return (
      <Teacher
        resetLogin={resetLogin}
        materials={materials}
        setMaterials={setMaterials}
        homeworks={homeworks}
        setHomeworks={setHomeworks}
        tests={tests}
        setTests={setTests}
      />
    );
  }

  return (
    <Student
      resetLogin={resetLogin}
      grade={grade}
      materials={materials}
      homeworks={homeworks}
      tests={tests}
    />
  );
}

export default App;