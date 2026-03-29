package com.netflix.latam.peliiculas.Service;
import com.netflix.latam.peliiculas.DTO.Request.CategoriaRequestDTO;
import com.netflix.latam.peliiculas.DTO.Response.CategoriaResponseDTO;


import java.util.List;

public interface CategoriaService {
    List<CategoriaResponseDTO> findAllByEstatus(Boolean estatus);
    CategoriaResponseDTO findById(Long id);
    CategoriaResponseDTO save(CategoriaRequestDTO cDto);
    CategoriaResponseDTO update(Long id, CategoriaRequestDTO cDto);
    void delete(Long id);
}
