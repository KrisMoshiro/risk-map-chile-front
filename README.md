# 🌍 Risk Map Iquique Front

![Project Banner](https://img.shields.io/github/deployments/krismoshiro/risk-map-iquique-front/github-pages?label=Deploy&style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

**Visualización interactiva de zonas críticas de accidentes en la Región de Tarapacá, Chile**  
Repositorio Front-End del proyecto de investigación con minería de datos.

🔗 **Demo:** [https://krismoshiro.github.io/risk-map-iquique-front/](https://krismoshiro.github.io/risk-map-iquique-front/)

---

## 🧩 Estructura del Proyecto

El proyecto completo está dividido en tres repositorios:

- **Frontend:** [`risk-map-iquique-front`](https://github.com/krismoshiro/risk-map-iquique-front) ← *este repositorio*
- **Backend:** [[Repositorio Backend](#)](https://github.com/vistor05/Risk_Map_Iquique_Back)
- **Datos procesados y crudos:** [[Repositorio de Datos](https://github.com/KrisMoshiro/risk-map-iquique-data)]

---

## 📌 Objetivo del Proyecto

Analizar los accidentes de tránsito en la región de Tarapacá entre los años **2010 y 2023**, utilizando **minería de datos** para identificar zonas de mayor riesgo y permitir una **visualización geográfica clara** de estos puntos críticos.

### Problemas Abordados

- Datos disponibles como reportes, no como mapas interactivos.
- Falta de accesibilidad y visualización geoespacial.
- Limitaciones en uso de datos para toma de decisiones.

### Impacto Esperado

- Identificación de zonas críticas.
- Apoyo a decisiones urbanas y de seguridad vial.
- Visualización accesible para autoridades y ciudadanía.

---

## ⚙️ Tecnologías Utilizadas

### Frontend

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite](https://vitejs.dev/) (build y desarrollo)
- [GitHub Pages](https://pages.github.com/) (deploy)

### Backend y Minería de Datos (ver otros repos)

- Python (pandas, scikit-learn, Folium, etc.)
- Algoritmo: DBSCAN (clustering espacial)
- Visualización: mapas con Folium
- Fast API
---

## 🧠 Proceso de Minería de Datos

### 1. Comprensión del Negocio

- Datos públicos de siniestros viales de **Carabineros de Chile** y **CONASET**.
- Foco en accidentes con geolocalización en la región de Tarapacá.

### 2. Preparación de los Datos

- Limpieza y transformación de registros.
- Geocodificación: conversión a latitud y longitud.

### 3. Modelado

- Aplicación del algoritmo **DBSCAN** para segmentación espacial.
- Agrupación de siniestros en zonas críticas.
- Clustering por:
  - **Tramos horarios:** 00-06, 06-12, 12-19, 19-00.
  - **Gravedad:** Muertos, graves, menos graves, leves, ilesos.

### 4. Evaluación

- Validación visual con mapas de Folium.
- Comparación con conocimiento empírico de zonas de riesgo.
- Futuras mejoras: uso de métricas como silueta o codo.

---

## 🖥️ Instalación y Uso

```bash
# Clonar repositorio
git clone https://github.com/krismoshiro/risk-map-iquique-front.git
cd risk-map-iquique-front

# Instalar dependencias
npm install

# Correr en modo desarrollo
npm run dev

# Build para producción
npm run build

# Vista previa local de la build
npm run preview

# Deploy a GitHub Pages
npm run deploy

