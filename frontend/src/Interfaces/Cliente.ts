export interface Cliente {
    id: number;
    nombre: string;
    telefono: string;
    estatus: boolean;
}

export interface ClienteRequest {
    nombre: string;
    telefono: string;
}
