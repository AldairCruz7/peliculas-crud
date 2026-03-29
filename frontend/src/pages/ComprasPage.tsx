import { useEffect, useState } from 'react';
import { compraService } from '../Services/CompraService';
import type { Compra, CompraRequest } from '../Interfaces/Compra';
import type { Cliente } from '../Interfaces/Cliente';
import type { Pelicula } from '../Interfaces/Pelicula';
import {
    Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TextField, Typography,
    Box, Dialog, DialogTitle, DialogContent, DialogActions,
    MenuItem, Chip, Checkbox, FormControlLabel,
    FormGroup, Divider
} from '@mui/material';
import Loading from '../components/Loading';
import EmptyContent from '../components/EmptyContent';
import RefreshButton from '../components/RefreshButton';
import Alerta from "../components/Alerts.tsx";

export default function ComprasPage() {

    const [compras, setCompras] = useState<Compra[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [cargando, setCargando] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [alerta, setAlerta] = useState<{ mensaje: string; tipo: 'success' | 'error' } | null>(null);
    const [clienteId, setClienteId] = useState<number>(0);
    const [peliculasSeleccionadas, setPeliculasSeleccionadas] = useState<number[]>([]);

    function cargarCompras() {
        setCargando(true);
        compraService.getAll()
            .then(datos => setCompras(datos))
            .catch(e => setError(e.message))
            .finally(() => setCargando(false));
    }

    function cargarClientes() {
        compraService.getClientes()
            .then(datos => setClientes(datos))
            .catch(e => setError(e.message));
    }

    function cargarPeliculas() {
        compraService.getPeliculas()
            .then(datos => setPeliculas(datos))
            .catch(e => setError(e.message));
    }

    function nuevaCompra() {
        if (clientes.length === 0) {
            setAlerta({ mensaje: 'Debes crear un cliente primero.', tipo: 'error' });
            return;
        }
        if (peliculas.length === 0) {
            setAlerta({ mensaje: 'Debes crear peliculas primero.', tipo: 'error' });
            return;
        }
        setClienteId(null);
        setPeliculasSeleccionadas([]);
        setMostrarFormulario(true);
    }

    function togglePelicula(id: number) {
        setPeliculasSeleccionadas(prev =>
            prev.includes(id)
                ? prev.filter(p => p !== id)
                : [...prev, id]
        );
    }

    function guardarCompra(e: React.SyntheticEvent) {
        e.preventDefault();

        if (peliculasSeleccionadas.length === 0) {
            setAlerta({ mensaje: 'Selecciona al menos una pelicula.', tipo: 'error' });
            return;
        }

        const hoy = new Date().toISOString().split('T')[0];

        const compraRequest: CompraRequest = {
            clienteId,
            fechaCompra: hoy,
            detalles: peliculasSeleccionadas.map(id => ({ peliculaId: id })),
        };

        compraService.create(compraRequest)
            .then(() => {
                setMostrarFormulario(false);
                cargarCompras();
                setAlerta({ mensaje: 'Compra registrada correctamente', tipo: 'success' });
            })
            .catch(e => setAlerta({ mensaje: e.message, tipo: 'error' }));
    }

    function eliminarCompra(id: number) {
        compraService.remove(id)
            .then(() => {
                cargarCompras();
                setAlerta({ mensaje: 'Compra eliminada correctamente', tipo: 'success' });
            })
            .catch(e => setAlerta({ mensaje: e.message, tipo: 'error' }));
    }

    useEffect(() => {
        cargarCompras();
        cargarClientes();
        cargarPeliculas();
    }, []);

    return (
        <Box sx={{ p: 3, minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4">Compras</Typography>
                <RefreshButton onRefresh={cargarCompras} cargando={cargando} />
            </Box>

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
            )}

            <Button variant="contained" onClick={nuevaCompra} sx={{ mb: 2 }}>
                + Nueva Compra
            </Button>

            <Dialog
                open={mostrarFormulario}
                onClose={() => setMostrarFormulario(false)}
                maxWidth="sm"
                fullWidth>
                <DialogTitle>Nueva Compra</DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        label="Cliente"
                        value={clienteId}
                        onChange={e => setClienteId(Number(e.target.value))}
                        fullWidth
                        required
                        sx={{ mt: 1 }}>
                        {clientes.map(cli => (
                            <MenuItem key={cli.id} value={cli.id}>
                                {cli.nombre}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                        Selecciona películas:
                    </Typography>
                    <Divider sx={{ mb: 1 }} />
                    <FormGroup>
                        {peliculas.map(pel => (
                            <FormControlLabel
                                key={pel.id}
                                control={
                                    <Checkbox
                                        checked={peliculasSeleccionadas.includes(pel.id)}
                                        onChange={() => togglePelicula(pel.id)}
                                    />
                                }
                                label={pel.nombre}
                            />
                        ))}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setMostrarFormulario(false)}>
                        Cancelar
                    </Button>
                    <Button variant="contained" onClick={guardarCompra}>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

            {cargando ? (
                <Loading />
            ) : compras.length === 0 ? (
                <EmptyContent
                    titulo="No hay compras"
                    descripcion="Aún no se han registrado compras."
                    textoBoton="Registrar compra"
                    onClickBoton={nuevaCompra}
                />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Películas</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {compras.map(compra => (
                                <TableRow key={compra.id} hover>
                                    <TableCell>{compra.id}</TableCell>
                                    <TableCell>{compra.clienteNombre}</TableCell>
                                    <TableCell>{compra.fechaCompra}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                            {compra.detalles.map(d => (
                                                <Chip
                                                    key={d.id}
                                                    label={d.peliculaNombre}
                                                    size="small"
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            onClick={() => eliminarCompra(compra.id)}>
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Alerta alerta={alerta} onClose={() => setAlerta(null)} />
        </Box>
    );
}
