import { apiClient } from '../api/apiClient';
import type { Compra, CompraRequest } from '../Interfaces/Compra';
import type { Cliente } from '../Interfaces/Cliente';
import type { Pelicula } from '../Interfaces/Pelicula';

const ENDPOINT = '/compras';

export const compraService = {

    getAll: (): Promise<Compra[]> =>
        apiClient.get(ENDPOINT),

    create: (data: CompraRequest): Promise<Compra> =>
        apiClient.post(ENDPOINT, data),

    remove: (id: number): Promise<void> =>
        apiClient.delete(`${ENDPOINT}/${id}`),

    getClientes: (): Promise<Cliente[]> =>
        apiClient.get('/clientes?estatus=true'),

    getPeliculas: (): Promise<Pelicula[]> =>
        apiClient.get('/peliculas?estatus=true'),
};
