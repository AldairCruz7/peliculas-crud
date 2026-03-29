package com.netflix.latam.peliiculas.DTO.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PeliculaRequestDTO {
    @NotBlank (message = "Nombre pelicula es requerido")
    private String nombre;
    private String descripcion;
    private Boolean estatus;
    private LocalDate fechaPublicacion;
    @NotNull(message = "Categoria requerida")
    private Long categoriaId;
    private Long CategoriaId;

}
