package com.netflix.latam.peliiculas.Mapper;

import com.netflix.latam.peliiculas.DTO.Request.PeliculaRequestDTO;
import com.netflix.latam.peliiculas.DTO.Response.PeliculaResponseDTO;
import com.netflix.latam.peliiculas.Model.Peliculas;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PeliculaMapper {

    public PeliculaResponseDTO toResponseDTO(Peliculas pelicula) {
        return new PeliculaResponseDTO(
            pelicula.getId(),
            pelicula.getNombre(),
            pelicula.getDescripcion(),
            pelicula.getCategoria().getNombre(),
            pelicula.getEstatus(),
            pelicula.getFechaPublicacion()
        );
    }

    public Peliculas toModel(PeliculaRequestDTO peliculaDTO) {
        Peliculas pelicula = new Peliculas();
        pelicula.setNombre(peliculaDTO.getNombre());
        pelicula.setDescripcion(peliculaDTO.getDescripcion());
        pelicula.setFechaPublicacion(peliculaDTO.getFechaPublicacion());
        pelicula.setEstatus(true);
        return pelicula;
    }

    public List<PeliculaResponseDTO> toResponseDTOList(List<Peliculas> pelicula) {
        return pelicula
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

}
