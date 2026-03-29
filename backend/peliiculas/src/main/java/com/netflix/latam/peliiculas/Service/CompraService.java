package com.netflix.latam.peliiculas.Service;
import com.netflix.latam.peliiculas.DTO.Request.CompraRequestDTO;
import com.netflix.latam.peliiculas.DTO.Response.CompraResponseDTO;


import java.util.List;

public interface CompraService {
    List<CompraResponseDTO> findAll();
    CompraResponseDTO findById(Long id);
    CompraResponseDTO save(CompraRequestDTO dto);
    void delete(Long id);
}