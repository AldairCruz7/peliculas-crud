export interface Categoria {
    id: number,
    nombre: string,
    descripcion: string,
    estatus: boolean
}

export interface CategoriaRequest {
    nombre: string,
    descripcion: string
}