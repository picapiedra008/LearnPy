import React, { useState, useEffect, useCallback } from "react"; 
import Compilador from "./Compilador/compilador";

const instruccionesIniciales = [
  {
    id: 1,
    texto: "Escribir un programa que muestre por pantalla la cadena ¡Hola Mundo!.",
    tipo: "salida",
    criterioSalida: "Hola Mundo",
    validado: false,
  },
  {
    id: 2,
    texto: "Escribir un programa que almacene la cadena ¡Hola Mundo! en una variable y luego muestre por pantalla el contenido de la variable.",
    tipo: "codigo",
    criterioSalida: "Hola Mundo",
    criterioCodigo: (code) => {
      return /[a-zA-Z_]\w*\s*=\s*['"]Hola Mundo['"]/.test(code);
    },
    validado: false,
  },
  {
    id: 3,
    texto:
      "Escribir un programa que pregunte el nombre del usuario en la consola y después de que el usuario lo introduzca muestre por pantalla la cadena ¡Hola <nombre>!",
    tipo: "salida",
    criterioSalida: (salida) => {
      return /¡Hola .+!/.test(salida);
    },
    validado: false,
  },
];

export default function PantallaCompilador() {
  const [code, setCode] = useState("");
  const [terminal, setTerminal] = useState("");
  const [instrucciones, setInstrucciones] = useState(instruccionesIniciales);

  useEffect(() => {
  

    setInstrucciones((prevInstrucciones) =>
      prevInstrucciones.map((inst) => {
        if (inst.validado) return inst;

        let salidaValida = false;
        if (typeof inst.criterioSalida === "function") {
          salidaValida = inst.criterioSalida(terminal);
        } else if (typeof inst.criterioSalida === "string") {
          salidaValida = terminal.includes(inst.criterioSalida);
        }

        let codigoValido = true;
        if (inst.tipo === "codigo") {
          if (typeof inst.criterioCodigo === "function") {
            codigoValido = inst.criterioCodigo(code);
          } else if (typeof inst.criterioCodigo === "string") {
            codigoValido = code.includes(inst.criterioCodigo);
          }
        }

        if (inst.tipo === "codigo") {
          if (codigoValido && salidaValida && terminal.trim() !== "") {
            return { ...inst, validado: true };
          }
        } else if (inst.tipo === "salida") {
          if (salidaValida) {
            return { ...inst, validado: true };
          }
        }

        return inst;
      })
    );
  }, [terminal, code]);

  const handleCodeChange = useCallback((newCode) => {
    setCode(newCode);
  }, []);

  const handleTerminalChange = useCallback((output) => {
    setTerminal(output);
  }, []);

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
      <div style={{ width: "30%" }}>
        <h2>Instrucciones</h2>
        <ul>
          {instrucciones.map((inst) => (
            <li key={inst.id} style={{ marginBottom: "1rem" }}>
              <span style={{ color: inst.validado ? "green" : "red" }}>
                {inst.validado ? "✅" : "❌"} {inst.texto}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ flexGrow: 1 }}>
        <Compilador
          initialCode={code}
          onCodeChange={handleCodeChange}
          onTerminalChange={handleTerminalChange}
        />
      </div>
    </div>
  );
}
