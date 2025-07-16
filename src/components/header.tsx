import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { Brightness4, Brightness7, GitHub, VolunteerActivism } from "@mui/icons-material";

import Logo from "../assets/Img/Logo.png";

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

export const Header = ({ darkMode, toggleTheme }: HeaderProps) => (
  <AppBar position="fixed" elevation={3}>
    <Toolbar>
      <Box
        component="img"
        src={Logo}
        alt="Logo"
        sx={{ height: 60, mr: 2, p: 0.6 }}
      />
      <Typography
        variant="h4"
        noWrap
        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
      >
        Risk Map Chile
      </Typography>
      <Typography
        variant="h6"
        sx={{ flexGrow: 1, display: { xs: "block", sm: "none" } }}
      >
        RMC
      </Typography>
      <IconButton href="https://www.paypal.com/donate/?hosted_button_id=6YCFLA9PJWU5G" target="_blank" title='Apoyanos con una donación vía Paypal' color="inherit" >
        <VolunteerActivism/>
      </IconButton>
      
     <IconButton href="https://github.com/KrisMoshiro/risk-map-chile" target="_blank" title='Ver Repositorio' color="inherit" >
        <GitHub/>
      </IconButton>

      <IconButton title='' color="inherit" onClick={toggleTheme}>
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>

      
    </Toolbar>
  </AppBar>
);
