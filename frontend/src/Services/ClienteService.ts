import { apiClient } from '../api/apiClient';
import type { Cliente, ClienteRequest } from '../Interfaces/Cliente';

const ENDPOINT = '/clientes';

export const clienteService = {

    getAll: (estatus: boolean = true): Promise<Cliente[]> =>
        apiClient.get(`${ENDPOINT}?estatus=${estatus}`),

    create: (data: ClienteRequest): Promise<Cliente> =>
        apiClient.post(ENDPOINT, data),

    update: (id: number, data: ClienteRequest): Promise<Cliente> =>
        apiClient.put(`${ENDPOINT}/${id}`, data),

    remove: (id: number): Promise<void> =>
        apiClient.delete(`${ENDPOINT}/${id}`),
};
