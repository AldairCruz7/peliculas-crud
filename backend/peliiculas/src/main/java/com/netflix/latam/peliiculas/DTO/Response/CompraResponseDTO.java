package com.netflix.latam.peliiculas.DTO.Response;

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
public class CompraResponseDTO {
    private Long id;
    private String clienteNombre;
    private LocalDate fechaCompra;
    private List<DetalleCompraResponseDTO> detalles;
}