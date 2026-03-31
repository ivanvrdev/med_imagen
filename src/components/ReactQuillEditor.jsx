// Instalación necesaria:
// npm install react-quill-new

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useState, useEffect } from "react";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header", "bold", "italic", "underline", "strike",
  "color", "background",
  "list",
  "align",
  "blockquote", "code-block",
  "link", "image",
];

export default function ReactQuillEditor({defaultValue = ""}) {
  const [value, setValue] = useState("");
    // `<h2>¡Hola desde React-Quill! 🖊️</h2><p>Este editor es simple de configurar y guarda el resultado en <strong>HTML</strong> directamente.</p><ul><li>Fácil de usar</li><li>Compatible con React 18+</li><li>Toolbar configurable</li></ul>`
  // const [showHtml, setShowHtml] = useState(false);

  useEffect(()=>{
    setValue(defaultValue)
  }, [defaultValue])

  return (
    <>
    <div style={{ 
      // fontFamily: "'Georgia', serif", 
      // maxWidth: 760, 
      maxWidth: '92ch', 
      margin: "10px auto",
      // padding: "0 20px" 
      
    }}>
      {/* Header */}
      {/* <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1b2a4a", margin: 0, letterSpacing: "-0.5px" }}>
          Editor React-Quill
        </h1>
        <p style={{ color: "#888", fontFamily: "sans-serif", fontSize: 13, marginTop: 4 }}>
          Powered by react-quill-new · HTML guardado en estado
        </p>
      </div> */}
      <p style={{color: "#00000099"}}>Contenido</p>
      {/* Editor Card */}
      <div style={{
        border: "1.5px solid #e0e7ef",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(27,42,74,0.08)",
        background: "#fff",
      }}>
        <style>{`
          .ql-toolbar.ql-snow {
            border: none !important;
            border-bottom: 1.5px solid #e0e7ef !important;
            background: #f7f9fc;
            padding: 10px 14px;
            flex-wrap: wrap;
          }
          .ql-container.ql-snow {
            border: none !important;
            font-size: 16px;
            /* font-family: Georgia, serif; */
          }
          .ql-editor {
            min-height: 240px;
            padding: 20px 24px;
            line-height: 1.75;
            color: #222;
          }
          .ql-editor h1 { color: #1b2a4a; }
          .ql-editor h2 { color: #1b2a4a; }
          .ql-editor h3 { color: #1b2a4a; }
          .ql-editor.ql-blank::before {
            color: #adb5bd;
            font-style: italic;
          }
          .ql-snow .ql-picker-label { color: #444; }
          .ql-snow.ql-toolbar button:hover .ql-stroke,
          .ql-snow .ql-toolbar button:hover .ql-stroke { stroke: #1b2a4a; }
          .ql-snow.ql-toolbar button.ql-active .ql-stroke { stroke: #2563eb; }
          .ql-snow.ql-toolbar button.ql-active { background: #eff6ff; border-radius: 4px; }
        `}</style>

        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          placeholder="Escribe algo aquí..."
        />
      </div>

      {/* Char count */}
      <div style={{ 
        textAlign: "right", 
        marginTop: 8, 
        // fontFamily: "sans-serif", 
        fontSize: 12, 
        color: "#aaa" 
      }}>
        {/* {value.replace(/<[^>]+>/g, "").length} caracteres (sin etiquetas) */}
        {value.replace(/<[^>]+>/g, "").length} caracteres
      </div>

      {/* HTML Output */}
      {/* <div style={{ marginTop: 16 }}>
        <button
          onClick={() => setShowHtml(!showHtml)}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "1.5px solid #1b2a4a",
            background: showHtml ? "#1b2a4a" : "transparent",
            color: showHtml ? "#93c5fd" : "#1b2a4a",
            fontFamily: "sans-serif",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            letterSpacing: "0.5px",
          }}
        >
          {showHtml ? "▼ Ocultar HTML" : "▶ Ver HTML generado"}
        </button>

        {showHtml && (
          <div style={{
            marginTop: 12,
            padding: "16px 20px",
            background: "#1b2a4a",
            borderRadius: 10,
            fontFamily: "monospace",
            fontSize: 13,
            color: "#93c5fd",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            lineHeight: 1.7,
            maxHeight: 280,
            overflowY: "auto",
          }}>
            {value}
          </div>
        )}
      </div> */}

      {/* Tip */}
      {/* <p style={{ marginTop: 20, color: "#aaa", fontSize: 12, fontFamily: "sans-serif" }}>
        💡 La variable <code style={{ background: "#f0f0f0", padding: "1px 5px", borderRadius: 3 }}>value</code> contiene siempre el HTML actualizado — úsala directamente para guardar en tu backend.
      </p> */}
    </div>
    </>
  );
}