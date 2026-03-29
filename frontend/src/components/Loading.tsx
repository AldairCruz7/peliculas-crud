import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px',
      gap: 2
    }}>
      <CircularProgress color="primary" />
      <Typography variant="body2" color="text.secondary">
        Cargando...
      </Typography>
    </Box>
  );
}