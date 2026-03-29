package com.netflix.latam.peliiculas.Service.implementaciones;

import com.netflix.latam.peliiculas.DTO.Request.ClienteRequestDTO;
import com.netflix.latam.peliiculas.DTO.Response.ClienteResponseDTO;
import com.netflix.latam.peliiculas.Mapper.ClienteMapper;
import com.netflix.latam.peliiculas.Model.Cliente;
import com.netflix.latam.peliiculas.Repository.ClienteRepository;
import com.netflix.latam.peliiculas.Service.ClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepository repository;
    private final ClienteMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<ClienteResponseDTO> findAllByEstatus(Boolean estatus) {
       List<Cliente> clientes = repository.findAllByEstatus(estatus);
       return mapper.toResponseDTOList(clientes);
    }

    @Override
    @Transactional(readOnly = true)
    public ClienteResponseDTO findById(Long id) {
        Cliente cliente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con id: " + id));
        return mapper.toResponseDTO(cliente);
    }

    @Override
    @Transactional
    public ClienteResponseDTO save(ClienteRequestDTO dto) {
        Cliente cliente = mapper.toModel(dto);
        return mapper.toResponseDTO(repository.save(cliente));
    }

    @Override
    @Transactional
    public ClienteResponseDTO update(Long id, ClienteRequestDTO dto) {
        Cliente cliente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con id: " + id));
        cliente.setNombre(dto.getNombre());
        cliente.setTelefono(dto.getTelefono());
        return mapper.toResponseDTO(repository.save(cliente));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Cliente cliente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con id: " + id));
        cliente.setEstatus(false);
        repository.save(cliente);
    }
}