// src/components/EditorPython.jsx
import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import Sk from 'skulpt';

export default function EditorPython({ code, setCode }) {
  const [error, setError] = useState('');
  const editorRef = useRef(null);
  const decorationsRef = useRef([]);

  useEffect(() => {
    const inputs = ['42', '13'];
    let inputIndex = 0;

    Sk.configure({
      inputfun: () => inputs[inputIndex++ % inputs.length],
      inputfunTakesPrompt: true,
      output: () => '',
    });
  }, []);

  useEffect(() => {
  const timeout = setTimeout(() => {
    if (!editorRef.current) return;

    setError('');

    try {
      Sk.parse('user_code.py', code);
      Sk.importMainWithBody('<stdin>', false, code, true);

      decorationsRef.current = editorRef.current.deltaDecorations(
        decorationsRef.current,
        []
      );
    } catch (e) {
      const errorMsg = e.toString();
      setError(errorMsg);

      const lineMatch = errorMsg.match(/line (\d+)/i);
      let lineNumber = 1;
      if (lineMatch) {
        lineNumber = parseInt(lineMatch[1], 10);
      }

      const model = editorRef.current.getModel();
      const lineLength = model.getLineLength(lineNumber);

      decorationsRef.current = editorRef.current.deltaDecorations(
        decorationsRef.current,
        [
          {
            range: new window.monaco.Range(lineNumber, 1, lineNumber, lineLength + 1),
            options: {
              isWholeLine: true,
              className: 'errorHighlight',
              hoverMessage: { value: '**Error aquí**' },
            },
          },
        ]
      );
    }
  }, 300);

  return () => clearTimeout(timeout);
}, [code]);

  return (
    <>
      <style>{`
        .errorHighlight {
          background-color: rgba(255, 0, 0, 0.3);
          border-left: 3px solid red;
        }
      `}</style>
      <Editor
        height="300px"
        language="python"
        value={code}
        theme="vs-dark"
        onChange={(value) => setCode(value || '')}
        onMount={(editor) => (editorRef.current = editor)}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          readOnly: false,
        }}
      />
      {error && (
        <div style={{ marginTop: '0.5rem', color: 'red', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
          {error}
        </div>
      )}
    </>
  );
}