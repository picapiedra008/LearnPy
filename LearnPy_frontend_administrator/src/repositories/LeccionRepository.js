// src/repositories/leccionesRepository.js

const LECCIONES_FALSAS = [
    {
        id: 1,
        titulo: "Introducción a Python",
        descripcion: "Conceptos básicos del lenguaje Python",
        nombre: "Introducción a Python"
    },
    {
        id: 2,
        titulo: "Estructuras de datos",
        descripcion: "Listas, tuplas y diccionarios en Python",
        nombre: "Estructuras de datos"
    },
    {
        id: 3,
        titulo: "Funciones en Python",
        descripcion: "Cómo crear y usar funciones",
        nombre: "Funciones en Python"
    },
    {
        id: 4,
        titulo: "Programación orientada a objetos",
        descripcion: "Clases y objetos en Python",
        nombre: "Programación orientada a objetos"
    },
    {
        id: 5,
        titulo: "Manejo de archivos",
        descripcion: "Lectura y escritura de archivos",
        nombre: "Manejo de archivos"
    }
];

// Simulación de llamada asíncrona a backend
export const obtenerLecciones = async () => {
    await new Promise(resolve => setTimeout(resolve, 800)); // simular retraso
    return LECCIONES_FALSAS;
};

// Simulación de eliminación
export const eliminarLeccionPorId = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // simular retraso
    return id;
};

export const eliminarLeccionesPorIds = async (ids) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // simular retraso
    return ids;
};
