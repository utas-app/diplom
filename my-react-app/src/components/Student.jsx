import React from "react";

function Student({ resetLogin, grade, materials, homeworks, tests }) {

  // зөвхөн өөрийн анги, бүлгийн зүйлс
  const filteredMaterials = materials.filter((m) => m.grade === grade);
  const filteredHomeworks = homeworks.filter((h) => h.grade === grade);
  const filteredTests = tests.filter((t) => t.grade === grade);

  // Файл preview хийх функц
  const openFile = (file) => {
    if (!file) return;
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank"); // шинэ таб дээр нээх
  };

  return (
    <div className="container">
      <h2>Сурагчийн хэсэг ({grade})</h2>

      <h3>Материал</h3>
      <ul>
        {filteredMaterials.map((m, i) => (
          <li key={i}>
            {m.text}{" "}
            {m.file && (
              <button onClick={() => openFile(m.file)} style={{cursor:"pointer"}}>
                📎 {m.file.name}
              </button>
            )}
          </li>
        ))}
      </ul>

      <h3>Гэрийн даалгавар</h3>
      <ul>
        {filteredHomeworks.map((h, i) => (
          <li key={i}>
            {h.text}{" "}
            {h.file && (
              <button onClick={() => openFile(h.file)} style={{cursor:"pointer"}}>
                📎 {h.file.name}
              </button>
            )}
          </li>
        ))}
      </ul>

      <h3>Сорил</h3>
      <ul>
        {filteredTests.map((t, i) => (
          <li key={i}>
            {t.text}{" "}
            {t.file && (
              <button onClick={() => openFile(t.file)} style={{cursor:"pointer"}}>
                📎 {t.file.name}
              </button>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={resetLogin}
        style={{ marginTop: "20px", background: "#e74c3c", color: "white" }}
      >
        Logout / Нэвтрэх рүү буцах
      </button>
    </div>
  );
}

export default Student;