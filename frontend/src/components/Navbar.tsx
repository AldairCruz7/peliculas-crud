import { Link, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Box
} from '@mui/material';

export default function Navbar() {
  const location = useLocation();

  const rutas = [
    { path: '/categorias', label: 'Categorías' },
    { path: '/peliculas', label: 'Películas' },
    { path: '/clientes', label: 'Clientes' },
    { path: '/compras', label: 'Compras' },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 0, mr: 4, color: '#e94560' }}>
        Tetflix 
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {rutas.map(ruta => (
            <Button
              key={ruta.path}
              component={Link}
              to={ruta.path}
              sx={{
                color: location.pathname === ruta.path ? '#e94560' : 'white',
                borderBottom: location.pathname === ruta.path
                  ? '2px solid #e94560'
                  : 'none',
                borderRadius: 0,
              }}>
              {ruta.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}