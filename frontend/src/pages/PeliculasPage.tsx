import { useEffect, useState } from 'react';

import type { Pelicula, PeliculaRequest } from '../Interfaces/Pelicula';
import type { Categoria } from '../Interfaces/Categoria';
import {
    Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TextField, Typography,
    Box, Dialog, DialogTitle, DialogContent, DialogActions,
    Chip, MenuItem
} from '@mui/material';
import Loading from '../components/Loading';
import EmptyContent from '../components/EmptyContent';
import { peliculaService } from "../Services/PeliculasService.ts";
import RefreshButton from "../components/RefreshButton.tsx";
import Alerta from "../components/Alerts.tsx";

export default function PeliculasPage() {

    const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [cargando, setCargando] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [seleccionada, setSeleccionada] = useState<Pelicula | null>(null);
    const [alerta, setAlerta] = useState<{ mensaje: string; tipo: 'success' | 'error' } | null>(null);

    const [formulario, setFormulario] = useState<PeliculaRequest>({
        nombre: '',
        descripcion: '',
        categoriaId: 0,
        fechaPublicacion: '',
    });

    function cargarPeliculas() {
        setCargando(true);
        peliculaService.getAll()
            .then(datos => setPeliculas(datos))
            .catch(e => setError(e.message))
            .finally(() => setCargando(false));
    }

    function cargarCategorias() {
        peliculaService.getCategorias()
            .then(datos => setCategorias(datos))
            .catch(e => setError(e.message));
    }

    useEffect(() => {
        cargarPeliculas();
        cargarCategorias();
    }, []);

    function cambiarCampo(e: React.ChangeEvent<HTMLInputElement>) {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    }

    function nuevaPelicula() {
        if (categorias.length === 0) {
            setAlerta({
                mensaje: 'Debes crear una categoría antes de agregar películas.',
                tipo: 'error'
            });
            return;
        }
        setSeleccionada(null);
        setFormulario({
            nombre: '',
            descripcion: '',
            categoriaId: 0,
            fechaPublicacion: ''
        });
        setMostrarFormulario(true);
    }

    function editarPelicula(pelicula: Pelicula) {
        setSeleccionada(pelicula);
        setFormulario({
            nombre: pelicula.nombre,
            descripcion: pelicula.descripcion,
            categoriaId: categorias.find(c => c.nombre === pelicula.categoriaNombre)?.id || 0,
            fechaPublicacion: pelicula.fechaPublicacion,
        });
        setMostrarFormulario(true);
    }

    function guardarPelicula(e: React.SyntheticEvent) {
        e.preventDefault();

        const accion = seleccionada
            ? peliculaService.update(seleccionada.id, formulario)
            : peliculaService.create(formulario);

        accion
            .then(() => {
                setMostrarFormulario(false);
                cargarPeliculas();
                setAlerta({ mensaje: 'Película guardada correctamente', tipo: 'success' });
            })
            .catch(e => setAlerta({ mensaje: e.message, tipo: 'error' }));
    }

    function eliminarPelicula(id: number) {
        peliculaService.remove(id)
            .then(() => {
                cargarPeliculas();
                setAlerta({ mensaje: 'Película eliminada correctamente', tipo: 'success' });
            })
            .catch(e => setAlerta({ mensaje: e.message, tipo: 'error' }));
    }

    return (
        <Box sx={{ p: 3, minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4">
                    Películas
                </Typography>
                <RefreshButton
                    onRefresh={cargarPeliculas}
                    cargando={cargando}
                />
            </Box>

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <Button variant="contained" onClick={nuevaPelicula} sx={{ mb: 2 }}>
                + Nueva Película
            </Button>

            <Dialog open={mostrarFormulario} onClose={() => setMostrarFormulario(false)}>
                <DialogTitle>
                    {seleccionada ? 'Editar Película' : 'Nueva Película'}
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
                        label="Descripción"
                        name="descripcion"
                        value={formulario.descripcion}
                        onChange={cambiarCampo}
                        fullWidth
                        sx={{ mt: 2 }}
                    />

                    <TextField
                        select
                        label="Categoría"
                        name="categoriaId"
                        value={formulario.categoriaId}
                        onChange={cambiarCampo}
                        fullWidth
                        required
                        sx={{ mt: 2 }}
                    >
                        {categorias.map(cat => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.nombre}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Fecha de Publicación"
                        name="fechaPublicacion"
                        type="date"
                        value={formulario.fechaPublicacion}
                        onChange={cambiarCampo}
                        fullWidth
                        sx={{ mt: 2 }}
                        InputLabelProps={{ shrink: true }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setMostrarFormulario(false)}>
                        Cancelar
                    </Button>

                    <Button variant="contained" onClick={guardarPelicula}>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

            {cargando ? (
                <Loading />
            ) : peliculas.length === 0 ? (
                <EmptyContent
                    titulo="No hay películas"
                    descripcion="Aún no se han registrado películas."
                />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Categoría</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Estatus</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {peliculas.map(pel => (
                                <TableRow key={pel.id} hover>
                                    <TableCell>{pel.id}</TableCell>
                                    <TableCell>{pel.nombre}</TableCell>
                                    <TableCell>{pel.descripcion}</TableCell>
                                    <TableCell>{pel.categoriaNombre}</TableCell>
                                    <TableCell>{pel.fechaPublicacion}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={pel.estatus ? 'Activo' : 'Inactivo'}
                                            color={pel.estatus ? 'success' : 'error'}
                                            size="small"
                                        />
                                    </TableCell>

                                    <TableCell>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => editarPelicula(pel)}
                                            sx={{ mr: 1 }}
                                        >
                                            Editar
                                        </Button>

                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            onClick={() => eliminarPelicula(pel.id)}
                                        >
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
