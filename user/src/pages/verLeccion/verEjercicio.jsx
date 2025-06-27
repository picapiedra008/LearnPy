import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Compilador from "../Compilador/compilador";

function VerEjercicio() {
  const { topicCode, exerciseId } = useParams();
  const [exercise, setExercise] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [code, setCode] = useState("");
  const [estado, setEstado] = useState(null);
  const [verificando, setVerificando] = useState(false);
  const [respuestaCruda, setRespuestaCruda] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    const fetchExerciseAndMaterials = async () => {
      try {
        const topicCodeNumber = Number(topicCode);

        const resExercises = await fetch("http://127.0.0.1:5000/exercise/get_exercises", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic_code: topicCodeNumber }),
        });

        const exercises = await resExercises.json();
        const foundExercise = exercises.find(e => e.exercise_code === Number(exerciseId));
        setExercise(foundExercise || null);

        if (foundExercise) {
          const resMaterials = await fetch("http://127.0.0.1:5000/exercise_material/get_exercise_materials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ exercise_code: foundExercise.exercise_code }),
          });
          const materialsData = await resMaterials.json();
          setMaterials(materialsData || []);
        } else {
          setMaterials([]);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseAndMaterials();
  }, [topicCode, exerciseId]);

  const verificarInstruccion = async () => {
    if (!code.trim()) {
      setEstado("vacio");
      return;
    }

    setVerificando(true);
    setEstado(null);
    setMensajeError("");
    setRespuestaCruda("");

    const prompt = `
Eres un evaluador automático de código Python.

La instrucción a cumplir es:
"""${exercise.exercise_instructions}"""

Evalúa el código dado y responde SOLO con un JSON válido y estrictamente formateado, sin texto adicional.

El JSON debe incluir al menos estas propiedades booleanas:

{
  "sintaxis_correcta": boolean,
  "cumple_instruccion": boolean,
  "tiene_salida": boolean,
  "usa_input": boolean,
  "estructura_logica_correcta": boolean,
  "errores_de_runtime": boolean,
  "uso_funciones": boolean,
  "observaciones": [string]
}

Código a evaluar:
"""${code}"""
`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "LearnPy-verificacion",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free",
          messages: [
            { role: "system", content: "Eres un evaluador automático de ejercicios de programación. Responde SOLO con JSON válido y nada más." },
            { role: "user", content: prompt },
          ],
          max_tokens: 350,
        }),
      });

      const data = await response.json();
      const rawRespuesta = data.choices?.[0]?.message?.content ?? "";

      let jsonRespuesta;
      try {
        jsonRespuesta = JSON.parse(rawRespuesta);
      } catch {
        const corregido = rawRespuesta.trim().replace(/,\s*]$/, "]");
        try {
          jsonRespuesta = JSON.parse(corregido);
        } catch {
          setEstado("error_json");
          setMensajeError("La respuesta del evaluador no es un JSON válido.");
          setRespuestaCruda(rawRespuesta);
          setVerificando(false);
          return;
        }
      }

      const requiereInput = /pida al usuario|input|leer entrada/i.test(exercise.exercise_instructions);
      const requiereSalida = /muestre|imprima|print|salida/i.test(exercise.exercise_instructions);

      let validacionBasica =
        jsonRespuesta.sintaxis_correcta &&
        jsonRespuesta.cumple_instruccion &&
        jsonRespuesta.estructura_logica_correcta &&
        !jsonRespuesta.errores_de_runtime;

      if (requiereInput && !jsonRespuesta.usa_input) validacionBasica = false;
      if (requiereSalida && !jsonRespuesta.tiene_salida) validacionBasica = false;

      setEstado(validacionBasica ? "completo" : "incompleto");
      setRespuestaCruda(JSON.stringify(jsonRespuesta, null, 2));
    } catch (error) {
      console.error("Error al verificar:", error);
      setEstado("error_json");
      setMensajeError("Error en la verificación. Inténtalo más tarde.");
    }

    setVerificando(false);
  };

  if (loading) return <div>Cargando...</div>;
  if (!exercise) return <div>No se encontró el ejercicio.</div>;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "1rem" }}>
        <h1>{exercise.exercise_title}</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>{exercise.exercise_instructions}</p>

        <button
          onClick={verificarInstruccion}
          style={{ padding: "8px 16px", fontSize: "16px", marginTop: "0.5rem" }}
          disabled={verificando}
        >
          {verificando ? "Verificando..." : "Verificar Ejercicio"}
        </button>

        {estado === "vacio" && <div style={{ marginTop: 10, color: "orange", fontWeight: "bold" }}>⚠️ Debes escribir código antes de verificar.</div>}
        {estado === "completo" && <div style={{ marginTop: 10, fontSize: 16, fontWeight: "bold", color: "green" }}>✅ COMPLETO</div>}
        {estado === "incompleto" && <div style={{ marginTop: 10, fontSize: 16, fontWeight: "bold", color: "red" }}>❌ INCOMPLETO</div>}
        {estado === "error_json" && (
          <div style={{ marginTop: 10, color: "red", whiteSpace: "pre-wrap", fontFamily: "monospace", backgroundColor: "#fee", padding: "10px", borderRadius: "5px" }}>
            ❌ Error al parsear JSON: {mensajeError}
            <br />
            <strong>Respuesta cruda recibida:</strong>
            <pre>{respuestaCruda}</pre>
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: "flex", gap: "1rem", padding: "1rem", minHeight: 0 }}>
        <div style={{ flex: 1, overflowY: "auto", border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
          <h3>Materiales:</h3>
          {materials.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
              {materials.map((mat) => {
                const trimmedRoute = mat.material_rute?.trim() || "";
                const type = mat.material_type_name?.trim().toLowerCase() || "";

                let driveUrl = "";
                if (["png", "jpg", "jpeg", "mp4"].includes(type)) {
                  driveUrl = trimmedRoute ? `https://drive.google.com/uc?export=view&id=${trimmedRoute}` : "";
                } else if (type === "pdf") {
                  driveUrl = trimmedRoute ? `https://drive.google.com/file/d/${trimmedRoute}/preview` : "";
                } else {
                  driveUrl = trimmedRoute ? `https://drive.usercontent.google.com/download?id=${trimmedRoute}` : "";
                }

                return (
                  <div key={mat.material_code} style={{ border: "1px solid #ddd", padding: "0.5rem", borderRadius: "6px", textAlign: "center", backgroundColor: "white" }}>
                    <strong style={{ display: "block", marginBottom: "0.5rem" }}>{mat.material_name}</strong>
                    {driveUrl ? (
                      ["png", "jpg", "jpeg"].includes(type) ? (
                        <img src={driveUrl} alt={mat.material_name} style={{ maxWidth: "100%", borderRadius: "4px" }} />
                      ) : type === "mp4" ? (
                        <video controls width="100%" style={{ borderRadius: "4px" }}>
                          <source src={driveUrl} type={`video/${type}`} />
                          Tu navegador no soporta video.
                        </video>
                      ) : type === "pdf" ? (
                        <iframe src={driveUrl} style={{ width: "100%", height: "800px", border: "none", borderRadius: "4px" }} title={mat.material_name} />
                      ) : (
                        <a href={driveUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", padding: "0.3rem 0.6rem", border: "1px solid #007bff", borderRadius: "4px", color: "#007bff", textDecoration: "none" }}>
                          Ver documento
                        </a>
                      )
                    ) : (
                      <p style={{ color: "#999" }}>Archivo no disponible</p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No hay materiales disponibles.</p>
          )}
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", overflow: "auto", minHeight: 0 }}>
          <h3>Compilador</h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <Compilador onCodeChange={(c) => setCode(c)} initialCode="" onTerminalChange={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerEjercicio;
