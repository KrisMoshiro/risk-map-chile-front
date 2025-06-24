import { Box, Typography } from "@mui/material";

export const Footer = ({ darkMode }: { darkMode: boolean }) => (
  <Box
    component="footer"
    sx={{
      width: "100%",
      bgcolor: darkMode ? "#1e1e1e" : "primary.main",
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
);
