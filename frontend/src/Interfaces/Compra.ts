export interface DetalleCompra {
    id: number;
    peliculaNombre: string;
}

export interface Compra {
    id: number;
    clienteNombre: string;
    fechaCompra: string;
    detalles: DetalleCompra[];
}

export interface DetalleCompraRequest {
    peliculaId: number;
}

export interface CompraRequest {
    clienteId: number;
    fechaCompra: string;
    detalles: DetalleCompraRequest[];
}
