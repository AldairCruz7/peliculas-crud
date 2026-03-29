import { apiClient } from '../api/apiClient';
import type { Pelicula, PeliculaRequest } from '../Interfaces/Pelicula';
import type { Categoria } from '../Interfaces/Categoria';

const ENDPOINT = '/peliculas';
const ENDPOINT_CATEGORIAS = '/categorias';

export const peliculaService = {
    getAll: (estatus: boolean = true): Promise<Pelicula[]> =>
        apiClient.get(`${ENDPOINT}?estatus=${estatus}`),

    create: (data: PeliculaRequest): Promise<Pelicula> =>
        apiClient.post(ENDPOINT, data),

    update: (id: number, data: PeliculaRequest): Promise<Pelicula> =>
        apiClient.put(`${ENDPOINT}/${id}`, data),

    remove: (id: number): Promise<void> =>
        apiClient.delete(`${ENDPOINT}/${id}`),

    getCategorias: (): Promise<Categoria[]> =>
        apiClient.get(`${ENDPOINT_CATEGORIAS}?estatus=true`),

};
