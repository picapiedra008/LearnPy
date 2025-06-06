import { useEffect, useRef, useState } from 'react'; 
import Editor from '@monaco-editor/react';
import Sk from 'skulpt';
import './EditorPython.css';

export default function EditorPython({ code, setCode }) {
  const [error, setError] = useState('');
  const editorRef = useRef(null);
  const decorationsRef = useRef([]);
  const lastLineRef = useRef(null);
  const errorLineRef = useRef(null);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    const inputs = ['42', '13'];
    let inputIndex = 0;

    Sk.configure({
      inputfun: () => inputs[inputIndex++ % inputs.length],
      inputfunTakesPrompt: true,
      output: () => '',
    });
  }, []);

  const validateCode = (code) => {
    if (!editorRef.current) return;

    setError('');
    errorLineRef.current = null;

    try {
      Sk.parse('user_code.py', code);
      Sk.importMainWithBody('<stdin>', false, code, true);

      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
    } catch (e) {
      const errorMsg = e.toString();
      const lineMatch = errorMsg.match(/line (\d+)/i);
      let errorLine = 1;
      if (lineMatch) {
        errorLine = parseInt(lineMatch[1], 10);
      }

      errorLineRef.current = errorLine;

      const cursorLine = editorRef.current.getPosition().lineNumber;

      if (cursorLine !== errorLine) {
        setError(errorMsg);

        const model = editorRef.current.getModel();
        const lineLength = model.getLineLength(errorLine);

        decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, [
          {
            range: new window.monaco.Range(errorLine, 1, errorLine, lineLength + 1),
            options: {
              isWholeLine: true,
              className: 'errorHighlight',
              hoverMessage: { value: '**Error aquí**' },
            },
          },
        ]);
      } else {
        setError('');
        decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
      }
    }
  };

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = editorRef.current;

    const onCursorChange = () => {
      const position = editor.getPosition();
      const currentLine = position.lineNumber;

      if (currentLine === errorLineRef.current) {
        setError('');
        decorationsRef.current = editor.deltaDecorations(decorationsRef.current, []);
      }

      if (lastLineRef.current !== null && lastLineRef.current !== currentLine) {
        validateCode(code);
      }

      lastLineRef.current = currentLine;
    };

    const onChange = () => {
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        const position = editor.getPosition();

        if (position.lineNumber !== errorLineRef.current) {
          validateCode(code);
        }
      }, 300);
    };

    const disposable1 = editor.onDidChangeCursorPosition(onCursorChange);
    const disposable2 = editor.onDidChangeModelContent(onChange);

    return () => {
      disposable1.dispose();
      disposable2.dispose();
      clearTimeout(debounceTimeout.current);
    };
  }, [code]);

  return (
    <>
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
        <div className="errorMessage">
          {error}
        </div>
      )}
    </>
  );
}
