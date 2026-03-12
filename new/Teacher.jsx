import React, { useState } from "react";

function Teacher({ resetLogin, materials, setMaterials, homeworks, setHomeworks, tests, setTests }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const addHomework = () => {
    if (!text && !file) return alert("Даалгавар эсвэл файл оруулна уу");
    setHomeworks([...homeworks, { text, file }]);
    setText("");
    setFile(null);
  };

  const addMaterial = () => {
    if (!text && !file) return alert("Материал эсвэл файл оруулна уу");
    setMaterials([...materials, { text, file }]);
    setText("");
    setFile(null);
  };

  const addTest = () => {
    if (!text && !file) return alert("Сорил эсвэл файл оруулна уу");
    setTests([...tests, { text, file }]);
    setText("");
    setFile(null);
  };

  return (
    <div className="container">
      <h2>Багшийн хэсэг</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Тайлбар бичих"
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <div className="buttons">
        <button onClick={addHomework}>Даалгавар</button>
        <button onClick={addMaterial}>Материал</button>
        <button onClick={addTest}>Сорил</button>
        <button>Дүн</button>
      </div>

      <button
        onClick={resetLogin}
        style={{ marginTop: "20px", background: "#e74c3c", color: "white" }}
      >
        Logout / Нэвтрэх рүү буцах
      </button>

      <div>
        <h3>Оруулсан Даалгавар:</h3>
        <ul>
          {homeworks.map((h, i) => (
            <li key={i}>
              {h.text} {h.file && <span>📎 {h.file.name}</span>}
            </li>
          ))}
        </ul>

        <h3>Оруулсан Материал:</h3>
        <ul>
          {materials.map((m, i) => (
            <li key={i}>
              {m.text} {m.file && <span>📎 {m.file.name}</span>}
            </li>
          ))}
        </ul>

        <h3>Оруулсан Сорил:</h3>
        <ul>
          {tests.map((t, i) => (
            <li key={i}>
              {t.text} {t.file && <span>📎 {t.file.name}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Teacher;