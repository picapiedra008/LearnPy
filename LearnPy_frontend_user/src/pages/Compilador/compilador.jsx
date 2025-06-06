import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import './compilador.css';
import EditorPython from "./ComponentsCompilador/EditorPython";

const KEYWORDS = [
  "print", "input", "for", "while", "if", "else", "elif", "def",
  "return", "import", "from", "class", "try", "except", "with", "as", "True", "False", "None"
];

export default function Compilador() {
  const [code, setCode] = useState("");
  const [terminal, setTerminal] = useState(">>>>");
  const [editableFrom, setEditableFrom] = useState(4);
  const [running, setRunning] = useState(false);
  const [processFinished, setProcessFinished] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });

  const textareaRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:5001");

    socketRef.current.on("output", (data) => {
      setTerminal((prev) => {
        const updated = prev + data;
        setEditableFrom(updated.length);

        if (data.includes("[Proceso terminado") || data.includes("[Proceso detenido")) {
          setRunning(false);
          setProcessFinished(true);
        }
        return updated;
      });

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
      }, 50);
    });

    socketRef.current.on("connect_error", () => {
      setTerminal((prev) => prev + "\n[Error de conexión con servidor]\n");
      setRunning(false);
      setProcessFinished(true);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  const runCode = () => {
    if (code.trim() === "") return;

    const prompt = ">>>>";
    setTerminal(prompt);
    setEditableFrom(prompt.length);
    setRunning(true);
    setProcessFinished(false);
    socketRef.current.emit("run_code", code);
  };

  const stopCode = () => {
    socketRef.current.emit("stop");
    setTerminal(prev => prev + "\n[Proceso detenido manualmente]\n>>>>");
    setRunning(false);
    setProcessFinished(true);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.length < editableFrom) return;
    setTerminal(val);
  };

  const handleKeyDown = (e) => {
    const textarea = textareaRef.current;

    if (e.key === "Backspace" && textarea.selectionStart <= editableFrom) {
      e.preventDefault();
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const input = terminal.slice(editableFrom).trim();
      socketRef.current.emit("input", input);
      const updated = terminal + "\n>>>>";
      setTerminal(updated);
      setEditableFrom(updated.length);
      setSuggestions([]);
    } else {
      const wordMatch = terminal.slice(editableFrom).split(/\s+/).pop();
      if (wordMatch.length > 0) {
        const matched = KEYWORDS.filter((kw) => kw.startsWith(wordMatch));
        setSuggestions(matched.length > 0 ? matched : []);
        updateCursorPosition();
      } else {
        setSuggestions([]);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const before = terminal.slice(0, editableFrom);
    const after = terminal.slice(editableFrom);
    const words = after.split(/\s+/);
    words.pop(); // Remove the last partial word
    const completed = before + words.join(" ") + (words.length ? " " : "") + suggestion + " ";
    setTerminal(completed);
    setEditableFrom(completed.length);
    setSuggestions([]);
  };

  const updateCursorPosition = () => {
    if (textareaRef.current) {
      const { offsetTop, offsetLeft } = textareaRef.current;
      setCursorPosition({ top: offsetTop + 100, left: offsetLeft + 20 }); // ajuste simple
    }
  };

  return (
    <div className="python-editor">
      <div className="code-header">apartado de código</div>
      <div className="file-header"> apartado_personal.py</div>

      <EditorPython code={code} setCode={setCode} />

      <div className="button-container">
        <button
          className="run-button"
          onClick={runCode}
          disabled={!processFinished || code.trim() === ""}
        >
          Run
        </button>
        <button
          className="stop-button"
          onClick={stopCode}
          disabled={processFinished}
        >
          Stop
        </button>
      </div>

      <div className="terminal-header">## Consola de resultados</div>

      <div style={{ position: "relative" }}>
        <textarea
          ref={textareaRef}
          className="terminal"
          value={terminal}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={!running}
          rows={6}
        />
        {suggestions.length > 0 && (
          <ul
            className="autocomplete-box"
            style={{
              position: "absolute",
              top: cursorPosition.top,
              left: cursorPosition.left,
              zIndex: 10,
              backgroundColor: "white",
              border: "1px solid #ccc",
              listStyle: "none",
              padding: 0,
              margin: 0,
              width: "150px",
            }}
          >
            {suggestions.map((s, i) => (
              <li
                key={i}
                onClick={() => handleSuggestionClick(s)}
                style={{
                  padding: "5px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
