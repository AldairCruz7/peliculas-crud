import { useEffect, useState } from 'react';
import { categoriaService } from '../Services/CategoriaService';
import type { Categoria } from '../Interfaces/Categoria';
import {
  Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, Typography,
  Box, Dialog, DialogTitle, DialogContent, DialogActions, Chip
} from '@mui/material';
import Loading from '../components/Loading';
import EmptyContent from '../components/EmptyContent';
import RefreshButton from "../components/RefreshButton.tsx";
import Alerta from "../components/Alerts.tsx";

export default function CategoriasPage() {

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [seleccionada, setSeleccionada] = useState<Categoria | null>(null);
  const [formulario, setFormulario] = useState({ nombre: '', descripcion: '' });
  const [cargando, setCargando] = useState(false);
  const [alerta, setAlerta] = useState<{ mensaje: string; tipo: 'success' | 'error' } | null>(null);



  function cargarCategorias() {
    setCargando(true);
    categoriaService.getAll()
        .then(datos => setCategorias(datos))
        .catch(e => setError(e.message))
        .finally(() => setCargando(false));
  }

  function cambiarCampo(e: React.ChangeEvent<HTMLInputElement>) {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  }

  function nuevaCategoria() {
    setSeleccionada(null);
    setFormulario({ nombre: '', descripcion: '' });
    setMostrarFormulario(true);
  }

  function editarCategoria(cat: Categoria) {
    setSeleccionada(cat);
    setFormulario({
      nombre: cat.nombre,
      descripcion: cat.descripcion
    });
    setMostrarFormulario(true);
  }

  function guardarCategoria(e: React.SyntheticEvent) {
    e.preventDefault();

    const accion = seleccionada
        ? categoriaService.update(seleccionada.id, formulario)
        : categoriaService.create(formulario);

    accion
        .then(() => {
          setMostrarFormulario(false);
          cargarCategorias();
          setAlerta({ mensaje: 'Categoría guardada correctamente', tipo: 'success' });
        })
        .catch(e => setAlerta({ mensaje: e.message, tipo: 'error' }));
  }

  function eliminarCategoria(id: number) {
    categoriaService.remove(id)
        .then(() => {
          cargarCategorias();
          setAlerta({ mensaje: 'Categoría eliminada correctamente', tipo: 'success' });
        })
        .catch(e => setAlerta({ mensaje: e.message, tipo: 'error' }));
  }

  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
      <Box sx={{ p: 3, minHeight: '100vh' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h4">
                  Categorias
              </Typography>
              <RefreshButton
                  onRefresh={cargarCategorias}
                  cargando={cargando}
              />
          </Box>
        {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
        )}

        <Button variant="contained" onClick={nuevaCategoria} sx={{ mb: 2 }}>
          + Nueva Categoría
        </Button>

        <Dialog open={mostrarFormulario} onClose={() => setMostrarFormulario(false)}>
          <DialogTitle>
            {seleccionada ? 'Editar Categoría' : 'Nueva Categoría'}
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
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setMostrarFormulario(false)}>
              Cancelar
            </Button>

            <Button variant="contained" onClick={guardarCategoria}>
              Guardar
            </Button>
          </DialogActions>
        </Dialog>

        {cargando ? (
            <Loading />
        ) : categorias.length === 0 ? (
            <EmptyContent
                titulo="No hay categorías"
                descripcion="Aún no se han registrado categorías."
            />
        ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Estatus</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {categorias.map(cat => (
                      <TableRow key={cat.id} hover>
                        <TableCell>{cat.id}</TableCell>
                        <TableCell>{cat.nombre}</TableCell>
                        <TableCell>{cat.descripcion}</TableCell>
                        <TableCell>
                          <Chip
                              label={cat.estatus ? 'Activo' : 'Inactivo'}
                              color={cat.estatus ? 'success' : 'error'}
                              size="small"
                          />
                        </TableCell>

                        <TableCell>
                          <Button
                              size="small"
                              variant="outlined"
                              onClick={() => editarCategoria(cat)}
                              sx={{ mr: 1 }}
                          >
                            Editar
                          </Button>

                          <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => eliminarCategoria(cat.id)}
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
