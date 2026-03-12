import React, { useState } from "react";

function Teacher({ resetLogin, materials, setMaterials, homeworks, setHomeworks, tests, setTests }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const MAX_FILE_SIZE_MB = 10; // хамгийн их хэмжээ

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
      alert(`Файл хэт том байна! (хамгийн их ${MAX_FILE_SIZE_MB}MB)`);
      return;
    }
    setFile(selectedFile);
  };

  const addItem = (type) => {
    if (!text && !file) return alert("Тайлбар эсвэл файл оруулна уу");

    const newItem = { text, file };

    switch (type) {
      case "homework":
        setHomeworks([...homeworks, newItem]);
        break;
      case "material":
        setMaterials([...materials, newItem]);
        break;
      case "test":
        setTests([...tests, newItem]);
        break;
      default:
        break;
    }

    setText("");
    setFile(null);
  };

  const removeItem = (type, index) => {
    switch (type) {
      case "homework":
        setHomeworks(homeworks.filter((_, i) => i !== index));
        break;
      case "material":
        setMaterials(materials.filter((_, i) => i !== index));
        break;
      case "test":
        setTests(tests.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  const renderList = (items, type) => (
    <ul>
      {items.map((item, i) => (
        <li key={i}>
          {item.text} {item.file && <span>📎 {item.file.name.length > 20 ? item.file.name.slice(0, 20) + "..." : item.file.name}</span>}
          <button onClick={() => removeItem(type, i)} style={{ marginLeft: "10px", color: "red" }}>Устгах</button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="container">
      <h2>Багшийн хэсэг</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Тайлбар бичих"
      />
      <input type="file" onChange={handleFileChange} />

      <div className="buttons">
        <button onClick={() => addItem("homework")}>Даалгавар</button>
        <button onClick={() => addItem("material")}>Материал</button>
        <button onClick={() => addItem("test")}>Сорил</button>
        <button>Дүн</button>
      </div>

      <button
        onClick={resetLogin}
        style={{ marginTop: "20px", background: "#e74c3c", color: "white" }}
      >
        Нэвтрэх рүү буцах
      </button>

      <div>
        <h3>Оруулсан Даалгавар:</h3>
        {renderList(homeworks, "homework")}

        <h3>Оруулсан Материал:</h3>
        {renderList(materials, "material")}

        <h3>Оруулсан Сорил:</h3>
        {renderList(tests, "test")}
      </div>
    </div>
  );
}

export default Teacher;