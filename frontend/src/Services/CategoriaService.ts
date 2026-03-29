import { apiClient } from '../api/apiClient';
import type { Categoria } from "../Interfaces/Categoria";

const ENDPOINT = '/categorias';

export const categoriaService = {

    getAll: (estatus: boolean = true): Promise<Categoria[]> =>
        apiClient.get(`${ENDPOINT}?estatus=${estatus}`),

    create: (data: { nombre: string; descripcion: string }): Promise<Categoria> =>
        apiClient.post(ENDPOINT, data),

    update: (id: number, data: { nombre: string; descripcion: string }): Promise<Categoria> =>
        apiClient.put(`${ENDPOINT}/${id}`, data),

    remove: (id: number): Promise<void> =>
        apiClient.delete(`${ENDPOINT}/${id}`),
};
