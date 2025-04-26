// src/App.tsx
import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const sections = [
  {
    title: "Mapa con las zonas identificadas con más accidentes",
    description:
      "Mapa realizado con minería de datos con información pública sobre los accidentes en la región de Tarapacá.",
    maps: [
      "https://held-test-inclusive-enquiries.trycloudflare.com/statics/Map1.html",
      "https://held-test-inclusive-enquiries.trycloudflare.com/statics/Map2.html",
      "https://held-test-inclusive-enquiries.trycloudflare.com/statics/Map3.html",
    ],
  },
  {
    title: "Mapa con las zonas identificadas con más muertes en accidentes",
    description:
      "Mapa realizado con minería de datos con información pública sobre los accidentes en la región de Tarapacá.",
    maps: [
      "https://held-test-inclusive-enquiries.trycloudflare.com/statics/Map4.html",
      "https://held-test-inclusive-enquiries.trycloudflare.com/statics/Map5.html",
      "https://tu-servidor.com/mapa-muertes-c.html",
    ],
  },
  {
    title: "Mapa con las zonas identificadas con más lesionados en accidentes",
    description:
      "Mapa realizado con minería de datos con información pública sobre los accidentes en la región de Tarapacá.",
    maps: [
      "https://tu-servidor.com/mapa-lesionados-a.html",
      "https://tu-servidor.com/mapa-lesionados-b.html",
      "https://tu-servidor.com/mapa-lesionados-c.html",
    ],
  },
];

function App() {
  const [mapIndexes, setMapIndexes] = useState<number[]>(sections.map(() => 0));

  const handleMapChange = (sectionIndex: number, newIndex: number) => {
    const updated = [...mapIndexes];
    updated[sectionIndex] = newIndex;
    setMapIndexes(updated);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" color="primary" elevation={2}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Risk Map Iquique Project
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* espacio compensatorio para el header */}
      <div className="bg-gradient-to-b from-blue-50 to-green-50">
        {sections.map((section, idx) => (
          <Container
            key={idx}
            sx={{
              maxWidth: "100vh",
              maxHeight: "100vh",
              py: 8,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                textAlign: "center",
              }}
            >
              {section.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{ textAlign: "center", mb: 4, maxWidth: 600 }}
            >
              {section.description}
            </Typography>

            {/* Botonera para cambiar mapas */}
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              {section.maps.map((_, mapIdx) => (
                <Button
                  key={mapIdx}
                  variant={
                    mapIndexes[idx] === mapIdx ? "contained" : "outlined"
                  }
                  onClick={() => handleMapChange(idx, mapIdx)}
                  size="small"
                >
                  Mapa {mapIdx + 1}
                </Button>
              ))}
            </Stack>

            {/* Box del mapa */}
            <Box
              sx={{
                width: "100%",
                height: "650px",
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <iframe
                src={section.maps[mapIndexes[idx]]}
                title={`Mapa ${idx + 1}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </Box>
          </Container>
        ))}

        {/* Footer ancho completo */}
        <Box
          component="footer"
          sx={{
            bgcolor: "primary.main",
            color: "white",
            py: 3,
            textAlign: "center",
            mt: 8,
            width: "100%",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Risk Map Project. Todos los derechos
            reservados.
          </Typography>
        </Box>
      </div>
    </>
  );
}

export default App;
