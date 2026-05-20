# CyberShield Academy

Videojuego educativo de ciberseguridad moderno, diseñado para enseñar conceptos básicos mediante simulaciones interactivas. Construido con el stack MERN (MongoDB, Express, React/Next.js, Node.js).

## Requisitos Previos
1. Node.js (v18+)
2. MongoDB (Instalado localmente o Docker)

## Instalación y Ejecución Rápida
Para Windows, simplemente haz doble clic en el archivo `run.bat` ubicado en la raíz del proyecto. Este script instalará automáticamente todas las dependencias e iniciará ambos servidores.

## Ejecución Manual
### 1. Iniciar Base de Datos (MongoDB)
Asegúrate de que MongoDB esté corriendo en el puerto por defecto (27017).

### 2. Backend
Abre una terminal en la carpeta `/backend`:
```bash
npm install
npm run dev
```
El servidor backend se iniciará en http://localhost:5000.

### 3. Frontend
Abre una nueva terminal en la carpeta `/frontend`:
```bash
npm install
npm run dev
```
El cliente de Next.js se iniciará en http://localhost:3000.

## Estructura
- `/backend`: API REST en Node.js + Express, Mongoose, JWT.
- `/frontend`: Next.js App Router, TailwindCSS, Framer Motion, Three.js.

## Niveles
- **Nivel 1:** Simulador de Detección de Phishing.
