package com.netflix.latam.peliiculas.DTO.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoriaRequestDTO {
    @NotBlank(message = "Nombre categoria es requerido")
    private String nombre;
    private String descripcion;
    private Boolean estatus;
}
