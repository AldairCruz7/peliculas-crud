package com.netflix.latam.peliiculas.Mapper;

import com.netflix.latam.peliiculas.DTO.Request.CompraRequestDTO;
import com.netflix.latam.peliiculas.DTO.Response.CompraResponseDTO;
import com.netflix.latam.peliiculas.DTO.Response.DetalleCompraResponseDTO;
import com.netflix.latam.peliiculas.Model.Compra;
import com.netflix.latam.peliiculas.Model.DetalleCompra;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CompraMapper {

    public CompraResponseDTO toResponseDTO(Compra compra) {
        List<DetalleCompraResponseDTO> detalles = compra.getDetalles()
                .stream()
                .map(d -> new DetalleCompraResponseDTO(
                        d.getId(),
                        d.getPelicula().getNombre()
                ))
                .collect(Collectors.toList());

        return new CompraResponseDTO(
                compra.getId(),
                compra.getCliente().getNombre(),
                compra.getFechaCompra(),
                detalles
        );
    }

    public Compra toModel(CompraRequestDTO dto) {
        Compra compra = new Compra();
        compra.setFechaCompra(dto.getFechaCompra());
        return compra;
    }

    public List<CompraResponseDTO> toResponseDTOList(List<Compra> compras) {
        return compras.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }
}