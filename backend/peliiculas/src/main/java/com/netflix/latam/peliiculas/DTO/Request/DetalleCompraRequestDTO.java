package com.netflix.latam.peliiculas.DTO.Request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DetalleCompraRequestDTO {
    @NotNull(message = "Pelicula requerida")
    private Long peliculaId;

}