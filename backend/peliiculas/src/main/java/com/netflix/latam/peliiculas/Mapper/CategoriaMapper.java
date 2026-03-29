package com.netflix.latam.peliiculas.Mapper;


import com.netflix.latam.peliiculas.DTO.Request.CategoriaRequestDTO;
import com.netflix.latam.peliiculas.DTO.Response.CategoriaResponseDTO;
import com.netflix.latam.peliiculas.Model.Categoria;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CategoriaMapper {


    public CategoriaResponseDTO toResponseDTO(Categoria categoria) {
        return new CategoriaResponseDTO(
            categoria.getId(),
            categoria.getNombre(),
            categoria.getDescripcion(),
            categoria.getEstatus()
        );
    }

    public Categoria toModel(CategoriaRequestDTO caDto) {
       Categoria categoria = new Categoria();
        categoria.setNombre(caDto.getNombre());
        categoria.setDescripcion(caDto.getDescripcion());
        categoria.setEstatus(true);
        return categoria;
    }

    public List<CategoriaResponseDTO> toResponseDTOList(List<Categoria> categorias) {
        return categorias
            .stream()
            .map(this::toResponseDTO)
            .collect(Collectors.toList());
    }

}
