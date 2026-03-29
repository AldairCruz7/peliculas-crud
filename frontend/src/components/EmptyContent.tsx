import React from 'react';
import { Box, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

interface Props {
  titulo?: string;
  descripcion?: string;
}

export default function EmptyContent({
  titulo = 'Sin información',
  descripcion = 'No hay registros disponibles para mostrar.',
}: Props) {
  return (
    <Box
      sx={{
        py: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'text.secondary'
      }}
    >
      <InboxIcon sx={{ fontSize: 60, mb: 2, opacity: 0.6 }} />

      <Typography variant="h6" gutterBottom>
        {titulo}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2 }}>
        {descripcion}
      </Typography>

    </Box>
  );
}
