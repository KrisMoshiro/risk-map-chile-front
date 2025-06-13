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
                  "Este proyecto busca analizar los accidentes de tránsito ocurridos en la región de Tarapacá, Chile, utilizando técnicas de minería de datos para identificar zonas críticas.",
                  "El objetivo principal es contribuir a la prevención de accidentes y la optimización de la planificación urbana y vial en la región de Tarapacá, utilizando registros de siniestros automovilísticos durante los años 2010 a 2023.",
                ],
                subSections: [
                  {
                    subtitle: "Problema abordado:",
                    items: [
                      "En Chile, la Comisión Nacional de Seguridad de Tránsito (CONASET) cuenta con registros de siniestros viales, sin embargo, la información disponible se presenta únicamente en forma de reportes con métricas y gráficos, en cambio Carabineros de Chile cuenta con los registros en bruto, en ambos casos ninguno cuenta con acceso directo a herramientas de visualización geográfica. Esto genera una problemática en la accesibilidad, presentación y aprovechamiento de la información, dificultando su uso para análisis más profundos y toma de decisiones informadas."
                    ],
                  },
                  {
                    subtitle: "Restricciones:",
                    items: [
                      "Limitaciones temporales y tecnológicas para la integración de mapas dinámicos.",
                      "Los datos deben incluir registros ocurridos en la región de Tarapacá, esto aplica a zonas urbanas, y rurales.",
                      "Los registros deben ir acompañados de datos geoespaciales,la fecha y hora del siniestro.",
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
                  "Los registros públicos de Carabineros de Chile son datos en bruto y no están segmentados por región o zona solo por año, estos incluyen información del siniestro como fecha, hora, tipo de accidente, región, comuna, etc.",
                ],
                subSections: [
                  {
                    subtitle: "Actividades realizadas:",
                    items: [
                      "Revisión de la estructura del archivo CSV.",
                      "Análisis exploratorio con pandas para entender la distribución de los datos.",
                      "Validación de la consistencia de coordenadas, tramos horarios y niveles de afectación.",
                    ],
                  },
                ],
                extraParagraphs: [
                  "Este análisis permitió definir los filtros que tendrán los mapas esperados, el primero se enfoca sobre cuatro tramos horarios específicos: madrugada (00-06), mañana (06-12), tarde (12-19) y noche (19-00) y el segundo se enfoca en cinco niveles de afectación: muertos, graves, menos graves, leves e ilesos.",
                ],
              },
              {
                title: "3. Preparación de los Datos",
                paragraphs: [
                  "Se aplicaron métodos para realizar la correlación entre los datos del dataset para identificar qué features no serían utilizados, en este caso para el contexto del proyecto y el mismo dataset, la mayoría de los samples son variables cualitativas, sólo unas pocas son cuantitativas.",
                ],
                subSections: [
                  {
                    subtitle: "Procesos aplicados:",
                    items: [
                      "Limpieza: eliminación de registros con valores nulos o coordenadas inválidas.",
                      "Transformación: ajuste de formatos de hora, conversión de columnas a tipos adecuados.",
                      "Geocodificación: transformación de direcciones en coordenadas de latitud y longitud."
                    ],
                  },
                ],
                extraParagraphs: [
                  "Esto es esencial para limpiar y unificar los datos, por otra parte la geocodificación era imprescindible ya que era necesario obtener las coordenadas en latitud y longitud para ubicar los accidentes.",
                ],
              },
              {
                title: "4. Modelado de Datos",
                paragraphs: [
                  "Para determinar el algoritmo de minería de datos adecuado, se consideraron tanto los objetivos técnicos como los del negocio. El objetivo de minería de datos fue identificar los puntos con mayor probabilidad de ocurrencia de accidentes de tránsito en la región de Tarapacá, mientras que el objetivo de la CONASET es reducir estos accidentes y sus consecuencias, enfocándose en el control de factores de riesgo. Al analizar ambos enfoques, se concluyó que el problema corresponde a una tarea de segmentación espacial, ya que implica agrupar incidentes por zonas de alto riesgo. Por ello, se optó por utilizar un algoritmo de clustering.",
                ],
                subSections: [
                  {
                    subtitle: "Herramientas utilizadas:",
                    items: [
                      "Python",
                      "Numpy",
                      "Matplotlib",
                      "Sklearn",
                      "Folium",
                    ],
                  },
                ],
                extraParagraphs: [
                  "Se aplicó un algoritmo con DBSCAN para identificar automáticamente el número de clusters, después con folium se define el punto central del mapa sacando el promedio de las coordenadas, después los datos se segmentan según los dos grupos elegidos para posteriormente graficar el mapa centrado junto con los clusters.",
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
                    ],
                  },
                ],
                extraParagraphs: [
                  "La calidad del clustering fue considerada adecuada para los fines del proyecto, aunque se mencionó la posibilidad de implementar métricas como la silueta o el codo en futuras iteraciones.",
                ],
              },
              {
                title: "6. Implementación",
                paragraphs: [
                  "Los resultados se integraron en la presente plataforma web para su visualización en diferentes dispositivos, la cual fue desarrollada en React JS con Typescript y Material Design.",
                ],
                subSections: [
                  {
                    subtitle: "Aspectos destacables:",
                    items: [
                      "Los mapas permiten una exploración visual clara de las zonas con más siniestros en la región.",
                      "El algoritmo y sistema puede escalar fácilmente para analizar más otras regiones o otros países.",
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
                <Box
                  sx={{
                    p: 3
                  }}
                >
                  <Typography variant="h6" color="primary" gutterBottom>
                    {step.title}
                  </Typography>

                  {step.paragraphs.map((p, i) => (
                    <Typography key={i} variant="body1" paragraph>
                      {p}
                    </Typography>
                  ))}

                  {step.subSections.map((sub, j) => (
                    <Box key={j} sx={{ mt: 2 }}>
                      {/* Caso: subtítulo presente y un solo item => título + párrafo */}
                      {sub.subtitle && sub.items.length === 1 ? (
                        <>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {sub.subtitle}
                          </Typography>
                          <Typography variant="body1">
                            {sub.items[0]}
                          </Typography>
                        </>
                      ) : !sub.subtitle && sub.items.length === 1 ? (
                        // Caso: sin subtítulo y un solo item => solo párrafo
                        <Typography variant="body1">{sub.items[0]}</Typography>
                      ) : (
                        // Caso: subtítulo + lista (más de 1 ítem)
                        <>
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
                        </>
                      )}
                    </Box>
                  ))}

                  {/* Extra párrafos fuera de las listas */}
                  {step.extraParagraphs &&
                    step.extraParagraphs.map((p, i) => (
                      <Typography
                        key={`extra-${i}`}
                        variant="body1"
                        sx={{ mt: 2 }}
                      >
                        {p}
                      </Typography>
                    ))}
                </Box>
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
