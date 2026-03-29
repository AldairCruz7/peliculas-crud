package com.netflix.latam.peliiculas.DTO.Request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CompraRequestDTO {

    @NotNull(message = "Cliente requerido")
    private Long clienteId;

    private LocalDate fechaCompra;

    @NotEmpty(message = "Debe agregar al menos una pelicula")
    private List<DetalleCompraRequestDTO> detalles;
}