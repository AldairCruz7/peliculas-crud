package com.netflix.latam.peliiculas.Mapper;

import com.netflix.latam.peliiculas.DTO.Request.ClienteRequestDTO;
import com.netflix.latam.peliiculas.DTO.Response.ClienteResponseDTO;
import com.netflix.latam.peliiculas.Model.Cliente;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ClienteMapper {

    public ClienteResponseDTO toResponseDTO(Cliente cliente) {
        return new ClienteResponseDTO(
                cliente.getId(),
                cliente.getNombre(),
                cliente.getTelefono(),
                cliente.getEstatus()
        );
    }

    public Cliente toModel(ClienteRequestDTO clienteDTO) {
        Cliente cliente = new Cliente();
        cliente.setNombre(clienteDTO.getNombre());
        cliente.setTelefono(clienteDTO.getTelefono());
        cliente.setEstatus(true);
        return cliente;
    }

    public List<ClienteResponseDTO> toResponseDTOList(List<Cliente> clientes) {
        return clientes
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

}
