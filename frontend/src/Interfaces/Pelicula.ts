export interface Pelicula {
    id: number;
    nombre: string;
    descripcion: string;
    categoriaNombre: string;
    estatus: boolean;
    fechaPublicacion: string;
}

export interface PeliculaRequest {
    nombre: string;
    descripcion: string;
    categoriaId: number;
    fechaPublicacion: string;
}
