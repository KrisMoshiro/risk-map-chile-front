import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Toolbar,
  Typography,
  Modal,
  Button,
  createTheme,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMemo, useState } from "react";
import { useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Explanation } from "./components/explanation";
import { MapDisplay } from "./components/mapdisplay";
import { LegendAndControl } from "./components/legendcontrol";
import { HelpModal } from "./components/helpmodal";

const mapSources = [{ src: "/risk-map-chile-front/map.html" }];

const explanationSteps = [
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
          "En Chile, la Comisión Nacional de Seguridad de Tránsito (CONASET) cuenta con registros de siniestros viales, sin embargo, la información disponible se presenta únicamente en forma de reportes con métricas y gráficos, en cambio Carabineros de Chile cuenta con los registros en bruto, en ambos casos ninguno cuenta con acceso directo a herramientas de visualización geográfica. Esto genera una problemática en la accesibilidad, presentación y aprovechamiento de la información, dificultando su uso para análisis más profundos y toma de decisiones informadas.",
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
        ],
      },
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
          "Limpieza: eliminación de registros con valores nulos o direcciónes y identificadores inválidos.",
          "Transformación: ajuste de formatos de datos, conversión de columnas a tipos adecuados.",
          "Geocodificación: transformación de direcciones en coordenadas de latitud y longitud.",
        ],
      },
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
        items: ["Python", "Numpy", "Matplotlib", "Sklearn", "Folium"],
      },
    ],
    extraParagraphs: [
      "Se aplicó un algoritmo con DBSCAN para identificar automáticamente el número de clusters, esto se validó con el coeficiente de silhouette, después con folium se define el punto central del mapa sacando el promedio de las coordenadas, posteriormente los datos se segmentan según la concentración de accidentes para posteriormente graficar el mapa centrado junto con los clusters.",
    ],
  },
  {
    title: "5. Evaluación",
    paragraphs: [
      "Se observó el mapa generado, para corroborar la calidad de las agrupaciones, verificando las similitudes con la vida real. Examinando las zonas de la ciudad donde se concentra la congestión vehicular, rotondas, y calles cerca de instituciones educaciones. Para fortalecer la evaluación, se evaluó la coherencia de los horarios en dichas zonas, verificando si corresponde con los momentos de mayor ocurrencia de accidentes.",
    ],
    subSections: [
      {
        subtitle: "",
        items: [],
      },
    ],
    extraParagraphs: [],
  },
  {
    title: "6. Implementación",
    paragraphs: [
      "El mapa generado fue incorporado en la presente página web con el objetivo de entregar un mejor contexto visual a los usuarios, facilitando la orientación y comprensión de los resultados. Por otro lado, el algoritmo desarrollado para la minería de datos en Python fue implementado en un Back-end utilizando el framework FastAPI.",
      "La idea principal consistía en generar los mapas desde el Back-end y servirlos al Front-end mediante peticiones GET. Esto permitiría actualizar los mapas sin necesidad de realizar un despliegue completo del sitio web cada vez que se requiriera modificar solo el contenido visual. Además, desde un comienzo se contempló la posibilidad de incorporar múltiples mapas con filtros personalizados e incluso mapas de distintas ciudades (para futuras versiones). Sin embargo, estas funcionalidades se vieron limitadas por la falta de recursos económicos.",
      "Ante la imposibilidad de costear un servidor propio o contratar un proveedor de servicios, se evaluaron alternativas como GitHub Pages o servicios gratuitos. No obstante, GitHub Pages no permite desplegar un Back-end, y el proveedor gratuito utilizado presentó serias limitaciones de rendimiento, con tiempos de carga elevados y la necesidad de acceder constantemente a la página para evitar que el servidor se suspendiera por inactividad.",
      "Como solución final, se optó por almacenar el mapa directamente en el Front-end, dentro de una carpeta estática, y cargarlo desde ahí. Si bien esta estrategia resolvió el problema de disponibilidad, implicó como desventaja que cualquier actualización del mapa requiere desplegar nuevamente todo el Front-end.",
    ],
    subSections: [
      {
        subtitle: "",
        items: [],
      },
    ],
  },
];

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const [activeMap] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [openFullscreen, setOpenFullscreen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showNota, setShowNota] = useState(true);
  const theme = useMemo(
    () => createTheme({ palette: { mode: darkMode ? "dark" : "light" } }),
    [darkMode]
  );
  const isDark = theme.palette.mode === "dark";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        darkMode={darkMode}
        toggleTheme={() => setDarkMode((prev) => !prev)}
      />
      <Toolbar />

      <Box
        sx={{ py: 3, px: 2, bgcolor: "background.default", minHeight: "100vh" }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            align="center"
            sx={{ fontSize: { xs: "1rem", md: "2.2rem" }, fontWeight: 600 }}
          >
            Mapa de accidentes Automovilísticos en la región de Tarapacá
          </Typography>

          <Typography align="center" mb={2}>
            Este mapa es el resultado de la aplicación de técnicas de minería de
            datos a registros públicos de Carabineros de Chile.
          </Typography>
          {showNota && (
            <Box
              sx={{
                position: "relative",
                maxWidth: 600,
                margin: "0 auto",
                mb: 3,
                p: 2,
                pr: 5, // espacio para que el texto no choque con la X
                border: `1px solid ${isDark ? "#FFD700" : "#B8860B"}`,
                color: isDark ? "#FFD700" : "#B8860B",
                borderRadius: 2,
                backgroundColor: isDark
                  ? "rgba(255, 215, 0, 0.1)"
                  : "rgba(184, 134, 11, 0.1)",
                fontSize: { xs: "0.85rem", sm: "1rem" },
              }}
            >
              <Typography variant="body2">
                <strong>Aviso:</strong> Los resultados presentados tienen un
                margen de error y no representan con exactitud absoluta la
                realidad. Su propósito es entregar una aproximación informada
                basada en los datos disponibles.
              </Typography>
              <IconButton
                size="small"
                onClick={() => setShowNota(false)}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  color: isDark ? "#FFD700" : "#B8860B",
                  padding: { xs: "4px", sm: "6px" }, // menos padding en móvil
                }}
                aria-label="cerrar nota"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
            }}
          >
            <MapDisplay mapSources={mapSources} />
            <LegendAndControl
              mapSrc={mapSources[activeMap].src}
              onFullscreen={() => setOpenFullscreen(true)}
              onHelp={() => setShowHelp(true)}
            />
          </Box>

          <Box textAlign="center" mt={3}>
            <Button onClick={() => setShowExplanation((prev) => !prev)}>
              {showExplanation
                ? "Ocultar explicación"
                : "¿Cómo se desarrolló este proyecto?"}
            </Button>
          </Box>

          {showExplanation && (
            <Container maxWidth="md">
              <Explanation steps={explanationSteps} />
            </Container>
          )}
        </Container>
      </Box>
      <Footer darkMode={darkMode} />

      <Modal open={openFullscreen} onClose={() => setOpenFullscreen(false)}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "background.default",
            zIndex: 1300,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1400,
            }}
          >
            <Button
              onClick={() => setOpenFullscreen(false)}
              variant="contained"
              startIcon={<ArrowBackIcon />}
              sx={{ borderRadius: 8 }}
            >
              Volver
            </Button>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1000,
            }}
          >
            <iframe
              src={mapSources[activeMap].src}
              title="Mapa en pantalla completa"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />
          </Box>
        </Box>
      </Modal>
      <HelpModal open={showHelp} onClose={() => setShowHelp(false)} />
    </ThemeProvider>
  );
}

export default App;
