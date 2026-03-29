import { useEffect, useState } from 'react';
import { clienteService } from '../Services/ClienteService';
import type { Cliente, ClienteRequest } from '../Interfaces/Cliente';
import {
    Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TextField, Typography,
    Box, Dialog, DialogTitle, DialogContent, DialogActions,
    Chip
} from '@mui/material';
import Loading from '../components/Loading';
import EmptyContent from '../components/EmptyContent';
import RefreshButton from '../components/RefreshButton';
import Alerta from "../components/Alerts.tsx";

export default function ClientesPage() {

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [cargando, setCargando] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [seleccionado, setSeleccionado] = useState<Cliente | null>(null);
    const [alerta, setAlerta] = useState<{ mensaje: string; tipo: 'success' | 'error' } | null>(null);
    const [formulario, setFormulario] = useState<ClienteRequest>({
        nombre: '',
        telefono: '',
    });

    function cargarClientes() {
        setCargando(true);
        clienteService.getAll()
            .then(datos => setClientes(datos))
            .catch(e => setError(e.message))
            .finally(() => setCargando(false));
    }

    function cambiarCampo(e: React.ChangeEvent<HTMLInputElement>) {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    }

    function nuevoCliente() {
        setSeleccionado(null);
        setFormulario({ nombre: '', telefono: '' });
        setMostrarFormulario(true);
    }

    function editarCliente(cliente: Cliente) {
        setSeleccionado(cliente);
        setFormulario({
            nombre: cliente.nombre,
            telefono: cliente.telefono,
        });
        setMostrarFormulario(true);
    }

    function guardarCliente(e: React.SyntheticEvent) {
        e.preventDefault();
        const accion = seleccionado
            ? clienteService.update(seleccionado.id, formulario)
            : clienteService.create(formulario);

        accion
            .then(() => {
                setMostrarFormulario(false);
                cargarClientes();
                setAlerta({ mensaje: 'Cliente guardado correctamente', tipo: 'success' });
            })
            .catch(e => setAlerta({ mensaje: e.message, tipo: 'error' }));
    }

    function eliminarCliente(id: number) {
        clienteService.remove(id)
            .then(() => {
                cargarClientes();
                setAlerta({ mensaje: 'Cliente eliminado correctamente', tipo: 'success' });
            })
            .catch(e => setAlerta({ mensaje: e.message, tipo: 'error' }));
    }

    useEffect(() => {
        cargarClientes();
    },[]);

    return (
        <Box sx={{ p: 3, minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4">
                    Clientes
                </Typography>
                <RefreshButton onRefresh={cargarClientes} cargando={cargando} />
            </Box>

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
            )}

            <Button variant="contained" onClick={nuevoCliente} sx={{ mb: 2 }}>
                + Nuevo Cliente
            </Button>

            <Dialog open={mostrarFormulario} onClose={() => setMostrarFormulario(false)}>
                <DialogTitle>
                    {seleccionado ? 'Editar Cliente' : 'Nuevo Cliente'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nombre"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={cambiarCampo}
                        fullWidth
                        required
                        sx={{ mt: 1 }}
                    />
                    <TextField
                        label="Teléfono"
                        name="telefono"
                        value={formulario.telefono}
                        onChange={cambiarCampo}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setMostrarFormulario(false)}>
                        Cancelar
                    </Button>
                    <Button variant="contained" onClick={guardarCliente}>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

            {cargando ? (
                <Loading />
            ) : clientes.length === 0 ? (
                <EmptyContent
                    titulo="No hay clientes"
                    descripcion="Aún no se han registrado clientes."
                />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Estatus</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clientes.map(cli => (
                                <TableRow key={cli.id} hover>
                                    <TableCell>{cli.id}</TableCell>
                                    <TableCell>{cli.nombre}</TableCell>
                                    <TableCell>{cli.telefono}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={cli.estatus ? 'Activo' : 'Inactivo'}
                                            color={cli.estatus ? 'success' : 'error'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => editarCliente(cli)}
                                            sx={{ mr: 1 }}>
                                            Editar
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            onClick={() => eliminarCliente(cli.id)}>
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
