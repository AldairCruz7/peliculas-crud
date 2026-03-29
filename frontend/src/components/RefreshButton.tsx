import { IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Props {
    onRefresh: () => void;
    cargando?: boolean;
}

export default function RefreshButton({ onRefresh, cargando = false }: Props) {
    return (
        <Tooltip title="Actualizar">
          <span>
            <IconButton
                onClick={onRefresh}
                disabled={cargando}
                color="primary">
              <RefreshIcon />
            </IconButton>
          </span>
        </Tooltip>
    );
}
