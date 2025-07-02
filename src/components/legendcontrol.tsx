// src/components/LegendAndControl.tsx
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface LegendAndControlProps {
  mapSrc: string;
  onFullscreen: () => void;
  onHelp: () => void;
}

export const LegendAndControl = ({
  mapSrc,
  onFullscreen,
  onHelp,
}: LegendAndControlProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isVerySmall = useMediaQuery("(max-width:350px)");

  const handleOpen = () => {
    if (isMobile) {
      onFullscreen();
    } else {
      window.open(mapSrc, "_blank");
    }
  };

  return (
    <Box
      className="tour-legend"
      sx={{
        minWidth: 200,
        maxWidth: 250,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2,
        mt: { xs: 2, md: 0 },
      }}
    >
      <Stack direction="row" spacing={1} width="100%">
        <Button
          className="fullscreen-button"
          onClick={handleOpen}
          variant="outlined"
          size="small"
          fullWidth
          startIcon={<FullscreenIcon />}
          sx={{
            borderRadius: 8,
            fontSize: isVerySmall ? "0" : "0.7rem", // Oculta texto en pantallas muy pequeñas
            px: isVerySmall ? 1 : 2,
            minWidth: isVerySmall ? "40px" : undefined,
          }}
        >
          {!isVerySmall && "Pantalla completa"}
        </Button>

        <Button
          className="help-button"
          onClick={onHelp}
          variant="outlined"
          size="small"
          fullWidth
          startIcon={<HelpOutlineIcon />}
          sx={{
            borderRadius: 8,
            fontSize: isVerySmall ? "0" : "0.7rem", // Oculta texto en pantallas muy pequeñas
            px: isVerySmall ? 1 : 2,
            minWidth: isVerySmall ? "40px" : undefined,
          }}
        >
          {!isVerySmall && "Ayuda"}
        </Button>
      </Stack>
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 2,
          borderRadius: 2,
          width: "100%",
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Leyenda de Agrupación de Zonas de Accidentes
        </Typography>
        <Stack spacing={1} mb={2}>
          {[
            { color: "#f1964d", label: "Alta" },
            { color: "#eecb40", label: "Media" },
            { color: "#95d862", label: "Baja" },
          ].map((item, i) => (
            <Stack key={i} direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: item.color,
                  boxShadow: 1,
                }}
              />
              <Typography variant="body2" color="text.primary">
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Leyenda de Cantidad Total de Accidentes por Zona
        </Typography>
        <Stack spacing={1}>
          {[
            { color: "blue", label: "0 - 5 (Muy Bajo)" },
            { color: "green", label: "6 - 15 (Bajo)" },
            { color: "yellow", label: "16 - 30 (Medio)" },
            { color: "orange", label: "31 - 50 (Alto)" },
            { color: "#ff4d4d", label: "51 - 80 (Muy Alto)" },
            { color: "#990000", label: "81+ (Crítico)" },
          ].map((item, i) => (
            <Stack key={i} direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: item.color,
                  boxShadow: 1,
                }}
              />
              <Typography variant="body2" color="text.primary">
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
