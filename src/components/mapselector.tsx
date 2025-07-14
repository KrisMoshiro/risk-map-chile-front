import {
  Stack,
  Button,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";

interface MapSelectorProps {
  activeMap: number;
  setActiveMap: (idx: number) => void;
  mapSources: { title: string }[];
}

export const MapSelector = ({
  activeMap,
  setActiveMap,
  mapSources,
}: MapSelectorProps) => {
  const isSmallScreen = useMediaQuery("(max-width:400px)");

  return isSmallScreen ? (
    <FormControl fullWidth>
      <Select
        value={activeMap}
        onChange={(e) => setActiveMap(Number(e.target.value))}
        sx={{ borderRadius: 2, px: 2, py: 1, fontSize: "0.9rem" }}
      >
        {mapSources.map((map, idx) => (
          <MenuItem key={idx} value={idx}>
            {map.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ flexWrap: "wrap", rowGap: 2, py: 1 }}
    >
      {mapSources.map((map, idx) => (
        <Button
          key={idx}
          variant={activeMap === idx ? "contained" : "outlined"}
          onClick={() => setActiveMap(idx)}
          sx={{
            borderRadius: 8,
            px: 2,
            fontSize: "0.85rem",
            whiteSpace: "nowrap",
          }}
        >
          {map.title}
        </Button>
      ))}
    </Stack>
  );
};
