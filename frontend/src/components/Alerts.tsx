import { Snackbar, Alert } from '@mui/material';

interface Props {
    alerta: { mensaje: string; tipo: 'success' | 'error' } | null;
    onClose: () => void;
}

export default function Alerta({ alerta, onClose }: Props) {
    return (
        <Snackbar
            open={!!alerta}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert
                onClose={onClose}
                severity={alerta?.tipo}
                variant="filled">
                {alerta?.mensaje}
            </Alert>
        </Snackbar>
    );
}
