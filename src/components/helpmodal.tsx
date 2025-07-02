import { Box, Modal, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

export const HelpModal = ({ open, onClose }: HelpModalProps) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        p: 4,
        borderRadius: 2,
        width: { xs: "90%", sm: 500 },
        maxHeight: "80vh",
        overflowY: "auto",
        boxShadow: 24,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
          Cómo usar el mapa
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <ul>
        <li>
          <Typography variant="body2">
            Usar el <b>mouse</b> con el <b>click izquierdo</b> para arrastrar. y hacer
            zoom con la rueda.
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Usar la <b>rueda</b> del <b>mouse</b> para hacer zoom.
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            En <b>dispositivos táctiles</b>, puedes navegar con los <b>dedos</b> y
            hacer zoom con ellos.
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Haz clic o toca los circulos de agrupamiento para hacer zoom o
            visualizar información.
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            También puedes abrir el mapa en pantalla completa para una mejor
            experiencia.
          </Typography>
        </li>
      </ul>
      <Typography variant="h6" fontWeight="bold">
        Sobre la información de los accidentes.
      </Typography>
      <ul>
        <li>
          <Typography variant="body2">
            para ver los datos de cada agrupación de accidentes se debe hacer zoom al nivel
            maximo.
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            A la hora de medir los fallecimientos, no se cuenta a los individuos
            que murieron en transporte de ambulancia, estos cuentan como
            involucrados de nivel de<b> Grave</b>.
          </Typography>
        </li>
      </ul>
    </Box>
  </Modal>
);
