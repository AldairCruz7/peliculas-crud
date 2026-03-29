package com.netflix.latam.peliiculas.Service;

import com.netflix.latam.peliiculas.DTO.Request.PeliculaRequestDTO;
import com.netflix.latam.peliiculas.DTO.Response.PeliculaResponseDTO;
import java.util.List;

public interface PeliculaService {
    List<PeliculaResponseDTO> findAllByEstatus(Boolean estatus);
    PeliculaResponseDTO findById(Long id);
    PeliculaResponseDTO save(PeliculaRequestDTO dto);
    PeliculaResponseDTO update(Long id, PeliculaRequestDTO dto);
    void delete(Long id);

}