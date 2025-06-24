import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

interface MapDisplayProps {
  mapSources: { src: string }[];
}

export const MapDisplay = ({ mapSources}: MapDisplayProps) => {
  const [loaded, setLoaded] = useState<boolean[]>(
    Array(mapSources.length).fill(false)
  );

  const handleLoad = (index: number) => {
    setLoaded((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: { xs: "1 / 1", sm: "16 / 9" },
      }}
    >
      {mapSources.map((map, i) => (
        <Box
          key={i}
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 4,
          }}
        >
          {!loaded[i] && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "background.paper",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <iframe
            src={map.src}
            title={`Mapa ${i + 1}`}
            width="100%"
            height="100%"
            loading="lazy"
            style={{ border: 0 }}
            onLoad={() => handleLoad(i)}
          />
        </Box>
      ))}
    </Box>
  );
};
