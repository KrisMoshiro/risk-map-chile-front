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

interface LegendAndControlProps {
  mapSrc: string;
  onFullscreen: () => void;
}

export const LegendAndControl = ({
  mapSrc,
  onFullscreen,
}: LegendAndControlProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = () => {
    if (isMobile) {
      onFullscreen();
    } else {
      window.open(mapSrc, "_blank");
    }
  };

  return (
    <Box
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
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 2,
          borderRadius: 2,
          width: "100%",
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Leyenda de Concentración de Accidentes
        </Typography>
        <Stack spacing={1}>
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
      </Box>
      <Button
        onClick={handleOpen}
        variant="outlined"
        size="small"
        fullWidth
        startIcon={<FullscreenIcon />}
        sx={{ borderRadius: 8 }}
      >
        Ver en pantalla completa
      </Button>
    </Box>
  );
};
