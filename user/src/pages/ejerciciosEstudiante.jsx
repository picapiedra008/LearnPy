import React, { useState } from "react"; 
import Compilador from "./Compilador/compilador";

const EJERCICIO = {
  instruccion: "Escribir un programa que pida al usuario su peso (en kg) y estatura (en metros), calcule el índice de masa corporal y lo almacene en una variable, y muestre por pantalla la frase Tu índice de masa corporal es <imc> donde <imc> es el índice de masa corporal calculado redondeado con dos decimales.",
  prompt:
    "Verifica si este código en Python cumple con la instrucción: 'Escribir un programa que pida al usuario su peso (en kg) y estatura (en metros), calcule el índice de masa corporal y lo almacene en una variable, y muestre por pantalla la frase Tu índice de masa corporal es <imc> donde <imc> es el índice de masa corporal calculado redondeado con dos decimales.'. Responde solo con VERDADERO o FALSO. Código:\n\n",
};

export default function EjerciciosEstudiante() {
  const [code, setCode] = useState("");
  const [estado, setEstado] = useState(null);
  const [verificando, setVerificando] = useState(false);

  const verificarInstruccion = async () => {
    setVerificando(true);
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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", 
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "LearnPy-verificacion",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free", 
          messages: [
            {
              role: "system",
              content: "Eres un evaluador automático de ejercicios de programación. Solo responde con VERDADERO o FALSO.",
            },
            {
              role: "user",
              content: EJERCICIO.prompt + code,
            },
          ],
          max_tokens: 10,
        }),
      });

      const data = await response.json();
      const respuesta = data.choices?.[0]?.message?.content?.toLowerCase() ?? "";

      if (respuesta.includes("verdadero")) {
        setEstado("completo");
      } else {
        setEstado("incompleto");
      }
    } catch (error) {
      console.error("Error al verificar:", error);
      setEstado(null);
    }
    setVerificando(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Instrucción:</h2>
      <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>{EJERCICIO.instruccion}</p>

      <Compilador
        onCodeChange={(c) => setCode(c)}
        onTerminalChange={() => {}}
        initialCode=""
      />

      <button
        onClick={verificarInstruccion}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
        disabled={verificando}
      >
        {verificando ? "Verificando..." : "Verificar Ejercicio"}
      </button>

      {estado && (
        <div
          style={{
            marginTop: "20px",
            fontSize: "18px",
            fontWeight: "bold",
            color: estado === "completo" ? "green" : "red",
          }}
        >
          {estado === "completo" ? "✅ COMPLETO" : "❌ INCOMPLETO"}
        </div>
      )}
    </div>
  );
}
