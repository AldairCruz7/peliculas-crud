package com.netflix.latam.peliiculas.Service;
import com.netflix.latam.peliiculas.DTO.Request.ClienteRequestDTO;
import com.netflix.latam.peliiculas.DTO.Response.ClienteResponseDTO;


import java.util.List;

public interface ClienteService {
    List<ClienteResponseDTO> findAllByEstatus(Boolean estatus);
    ClienteResponseDTO findById(Long id);
    ClienteResponseDTO save(ClienteRequestDTO cDto);
    ClienteResponseDTO update(Long id, ClienteRequestDTO cDto);
    void delete(Long id);
}
