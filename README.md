# Risk Map Chile Front

![Project Banner](https://img.shields.io/github/deployments/krismoshiro/risk-map-iquique-front/github-pages?label=Deploy&style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

**Visualización interactiva de zonas críticas de accidentes en la Región de Tarapacá, Chile**  
Repositorio Front-End del proyecto de investigación con minería de datos.

🔗 **Demo:** [https://krismoshiro.github.io/risk-map-iquique-front/](https://krismoshiro.github.io/risk-map-chile-front/)

![image](https://github.com/user-attachments/assets/0e33f5b9-6817-40a3-8ca8-db425d9f2f23)

---

## 🧩 Estructura del Proyecto

El proyecto completo está dividido en tres repositorios:

- **Frontend:** [`risk-map-chile-front`](https://github.com/krismoshiro/risk-map-chile-front) ← *este repositorio*
- **Backend:** [`risk-map-chile-back`](https://github.com/vistor05/risk_map_chile_back) 
- **Datos:** [`risk-map-chile-data`](https://github.com/krismoshiro/risk-map-chile-data)

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

---

## 🖥️ Instalación y Uso

```bash
# Clonar repositorio
git clone https://github.com/krismoshiro/risk-map-chile-front.git
cd risk-map-chile-front

# Instalar dependencias
npm install

# Correr en modo desarrollo
npm run dev

# Deploy a GitHub Pages
npm run deploy

