# **LearnPy - Plataforma de Aprendizaje**

LearnPy es una plataforma educativa que consta de un backend en Python y dos frontends en React (Vite) para administradores y usuarios. Esta guía te ayudará a configurar y ejecutar el proyecto en tu entorno local.

---

## **Estructura del Proyecto**

El proyecto está dividido en tres carpetas principales:

1. **Backend**: Aplicación en Python que maneja la lógica del servidor.
2. **Frontend Administrador**: Interfaz para administradores (React + Vite).
3. **Frontend Usuario**: Interfaz para usuarios regulares (React + Vite).

---

## **Requisitos Previos**

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina:

- **Node.js** (v16 o superior)
- **Python** (3.8 o superior)
- **pip** (gestor de paquetes de Python)
- **npm** o **yarn** (gestores de paquetes de Node)

---

## **Instalación**

### 1. Clonar el Repositorio

Primero, clona el repositorio en tu máquina local:

\`\`\`bash
git clone https://github.com/picapiedra008/LearnPy.git
cd LearnPy
\`\`\`

### 2. Instalar Dependencias del Backend

El backend está en la carpeta `LearnPy_backend`. Para instalar sus dependencias, usa el siguiente comando:

\`\`\`bash
pip install -r LearnPy_backend/requirements.txt
\`\`\`

### 3. Instalar Dependencias de Frontend

El proyecto tiene dos frontends: uno para el administrador y otro para el usuario. Para instalar las dependencias de ambos, ejecuta:

\`\`\`bash
npm install --prefix LearnPy_frontend_administrator
npm install --prefix LearnPy_frontend_user
\`\`\`

También puedes usar `yarn` si prefieres ese gestor de paquetes.

---

## **Ejecutar el Proyecto**

Tienes tres formas de ejecutar el proyecto dependiendo de lo que necesites:

### 1. Ejecutar Solo el Backend y el Frontend de Administrador

Para ejecutar el backend y el frontend del administrador, usa el siguiente comando:

\`\`\`bash
npm run start:admin
\`\`\`

### 2. Ejecutar Solo el Backend y el Frontend de Usuario

Para ejecutar el backend y el frontend de usuario, usa el siguiente comando:

\`\`\`bash
npm run start:user
\`\`\`

### 3. Ejecutar Todo el Proyecto (Backend + Frontend Administrador + Frontend Usuario)

Para ejecutar todos los componentes del proyecto al mismo tiempo, usa:

\`\`\`bash
npm run start:all
\`\`\`

Este comando ejecutará:

- El **Backend** en Python.
- El **Frontend Administrador** en React.
- El **Frontend Usuario** en React.

---

## **Scripts Utilitarios**

Aquí tienes algunos scripts adicionales que pueden ser útiles para tu desarrollo:

- **Instalar dependencias del backend**:  
  \`\`\`bash
  npm run install:backend
  \`\`\`

- **Instalar dependencias de los frontends**:  
  \`\`\`bash
  npm run install:frontend
  \`\`\`

---
