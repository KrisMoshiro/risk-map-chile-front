// src/App.tsx
import { useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { motion } from "framer-motion";
import Logo from "./assets/logo.png";

const mapSources = [
  {
    title: "Por estado de involucrados",
    description: "Mapa con minería de datos sobre accidentes en Tarapacá.",
    src: "https://held-test-inclusive-enquiries.trycloudflare.com/statics/Map1.html",
  },
  {
    title: "Por rango de horas",
    description: "Mapa con minería de datos sobre muertes en accidentes.",
    src: "https://held-test-inclusive-enquiries.trycloudflare.com/statics/Map4.html",
  },
];

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const [activeMap, setActiveMap] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
        shape: {
          borderRadius: 12,
        },
      }),
    [darkMode]
  );

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const acronym = "RMI Project"; // Acrónimo: Risk Map Iquique Project

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" elevation={3}>
        <Toolbar>
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            sx={{ height: 60, mr: 2, padding: 0.6 }}
          />
          <Typography
            variant="h4"
            noWrap
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Risk Map Iquique Project
          </Typography>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "none" } }}
          >
            {acronym}
          </Typography>
          <IconButton color="inherit" onClick={toggleTheme}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Toolbar />
      <Box
        sx={{ py: 6, px: 2, bgcolor: "background.default", minHeight: "100vh" }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            Mapas de accidentes Automovilísticos en la región de Tarapacá
          </Typography>
          <Typography variant="body1" align="center" mb={4}>
            Estos mapas son el resultado de la aplicación de técnicas de minería
            de datos a los registros públicos proporcionados por carabineros de
            Chile sobre los accidentes de transito a nivel nacional.
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center" mb={4}>
            {mapSources.map((map, idx) => (
              <Button
                key={idx}
                variant={activeMap === idx ? "contained" : "outlined"}
                onClick={() => setActiveMap(idx)}
                sx={{ borderRadius: 8 }}
              >
                {map.title}
              </Button>
            ))}
          </Stack>

          <Box
            component={motion.div}
            key={activeMap}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            sx={{
              width: "100%",
              aspectRatio: { xs: "4 / 3", sm: "16 / 9" },
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: 4,
            }}
          >
            <iframe
              src={mapSources[activeMap].src}
              title={`Mapa ${activeMap + 1}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />
          </Box>
        </Container>
        <Container maxWidth="md" sx={{ mt: 6, textAlign: "center" }}>
          <Button
            variant="text"
            onClick={() => setShowExplanation((prev) => !prev)}
            sx={{ borderRadius: 8 }}
          >
            {showExplanation
              ? "Ocultar explicación"
              : "¿Cómo se desarrolló este proyecto?"}
          </Button>
        </Container>

        {showExplanation && (
          <Container maxWidth="md" sx={{ mt: 4 }}>
            {[
              {
                title: "1. Comprensión del Negocio",
                paragraphs: [
                  "El proyecto busca analizar los accidentes de tránsito ocurridos en la región de Tarapacá, Chile, utilizando técnicas de minería de datos para identificar zonas críticas.",
                  "El objetivo principal es contribuir a la prevención de accidentes y la optimización de la planificación urbana y vial.",
                ],
                subSections: [
                  {
                    subtitle: "Problemas abordados:",
                    items: [
                      "Alta incidencia de accidentes en ciertos sectores de la ciudad.",
                      "Necesidad de segmentar los datos por horarios para identificar patrones temporales.",
                    ],
                  },
                  {
                    subtitle: "Restricciones:",
                    items: [
                      "Datos geoespaciales con posibles inconsistencias.",
                      "Limitaciones temporales y tecnológicas para la integración de mapas dinámicos.",
                    ],
                  },
                  {
                    subtitle: "Impacto esperado:",
                    items: [
                      "Identificación de zonas de mayor riesgo.",
                      "Visualización clara para apoyo a la toma de decisiones de autoridades y ciudadanos.",
                    ],
                  },
                ],
              },
              {
                title: "2. Comprensión de los Datos",
                paragraphs: [
                  "Se trabajó con un conjunto de datos proporcionado por el portal de Datos Abiertos de la Municipalidad de Santiago, que incluye información como fecha, hora, latitud, longitud y tipo de accidente.",
                ],
                subSections: [
                  {
                    subtitle: "Actividades realizadas:",
                    items: [
                      "Revisión de la estructura del archivo CSV.",
                      "Análisis exploratorio con pandas para entender la distribución de los datos.",
                      "Validación de la consistencia de coordenadas y tramos horarios.",
                    ],
                  },
                  {
                    subtitle: "",
                    items: [
                      "Este análisis permitió definir que el enfoque se realizaría sobre cuatro tramos horarios específicos: madrugada (00-06), mañana (06-12), tarde (12-19) y noche (19-00).",
                    ],
                  },
                ],
              },
              {
                title: "3. Preparación de los Datos",
                paragraphs: [
                  "La preparación se realizó de manera independiente por cada tramo horario, dividiendo el archivo principal en cuatro subconjuntos. Para cada uno:",
                ],
                subSections: [
                  {
                    subtitle: "Procesos aplicados:",
                    items: [
                      "Limpieza: eliminación de registros con valores nulos o coordenadas inválidas.",
                      "Transformación: ajuste de formatos de hora, conversión de columnas a tipos adecuados.",
                      "Segmentación: filtrado por horario y almacenamiento en nuevos archivos CSV.",
                    ],
                  },
                  {
                    subtitle: "",
                    items: [
                      "Este paso fue esencial para garantizar que el análisis por clustering se realizará correctamente y sin interferencias entre horarios.",
                    ],
                  },
                ],
              },
              {
                title: "4. Modelado de Datos",
                paragraphs: [
                  "Se aplicó el algoritmo KMeans para identificar conglomerados de accidentes en cada tramo horario. Para ello se seleccionó un número de clusters estimado en base a la distribución visual de los datos, utilizando un enfoque empírico (3 clusters por horario).",
                ],
                subSections: [
                  {
                    subtitle: "Herramientas utilizadas:",
                    items: [
                      "Python",
                      "Scikit-learn (para clustering)",
                      "Folium (para visualización geográfica)",
                    ],
                  },
                  {
                    subtitle: "",
                    items: [
                      "Cada modelo generó un conjunto de centroides que representan las zonas con mayor concentración de accidentes por horario.",
                    ],
                  },
                ],
              },
              {
                title: "5. Evaluación",
                paragraphs: [
                  "La evaluación del modelo se realizó mediante análisis visual y comparativo:",
                ],
                subSections: [
                  {
                    subtitle: "",
                    items: [
                      "Se observaron los mapas generados con Folium para comprobar que los clusters correspondían a zonas lógicamente agrupadas.",
                      "Se validaron los resultados con observaciones empíricas de la ciudad (zonas congestionadas, zonas con vida nocturna, etc.).",
                      "Se verificó la coherencia entre horarios (por ejemplo, aumento de accidentes nocturnos en sectores de entretenimiento).",
                      "La calidad del clustering fue considerada adecuada para los fines del proyecto, aunque se mencionó la posibilidad de implementar métricas como la silueta o el codo en futuras iteraciones.",
                    ],
                  },
                ],
              },
              {
                title: "6. Implementación",
                paragraphs: [
                  "Los resultados se integraron en un conjunto de mapas interactivos generados con Folium, uno por cada tramo horario. Cada mapa muestra los clusters detectados con diferente color y permite visualizar la latitud y longitud de los centroides.",
                ],
                subSections: [
                  {
                    subtitle: "Aspectos destacables:",
                    items: [
                      "Los mapas permiten una exploración visual clara por horario.",
                      "El sistema puede escalarse fácilmente para analizar más periodos o zonas.",
                      "Se plantea como trabajo futuro la integración de todos los tramos en una interfaz unificada con control dinámico por horario, y la mejora del diseño visual y la adaptabilidad del sistema para distintos dispositivos.",
                    ],
                  },
                ],
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {step.title}
                  </Typography>
                  <Box
                    sx={{
                      mb: 6,
                      p: 3,

                    }}
                  >
                    {step.paragraphs.map((p, i) => (
                      <Typography key={i} variant="body1" paragraph>
                        {p}
                      </Typography>
                    ))}

                    {step.subSections.map((sub, j) => (
                      <Box key={j} sx={{ mt: 2 }}>
                        {sub.subtitle && (
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {sub.subtitle}
                          </Typography>
                        )}
                        <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                          {sub.items.map((item, k) => (
                            <li key={k}>
                              <Typography variant="body2">{item}</Typography>
                            </li>
                          ))}
                        </ul>
                      </Box>
                    ))}
                  </Box>
                </>
              </motion.div>
            ))}
          </Container>
        )}
      </Box>

      <Box
        component="footer"
        sx={{
          width: "100%",
          bgcolor: darkMode ? "#1e1e1e" : theme.palette.primary.main,
          color: darkMode ? "#ccc" : "#fff",
          textAlign: "center",
          py: 3,
          px: 2,
          mt: "auto",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Risk Map Project. Todos los derechos
          reservados.
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default App;
