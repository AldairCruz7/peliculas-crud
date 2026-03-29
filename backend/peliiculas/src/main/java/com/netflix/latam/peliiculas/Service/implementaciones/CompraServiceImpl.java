package com.netflix.latam.peliiculas.Service.implementaciones;

import com.netflix.latam.peliiculas.DTO.Request.CompraRequestDTO;
import com.netflix.latam.peliiculas.DTO.Response.CompraResponseDTO;
import com.netflix.latam.peliiculas.Mapper.CompraMapper;
import com.netflix.latam.peliiculas.Model.Cliente;
import com.netflix.latam.peliiculas.Model.Compra;
import com.netflix.latam.peliiculas.Model.DetalleCompra;
import com.netflix.latam.peliiculas.Model.Peliculas;
import com.netflix.latam.peliiculas.Repository.ClienteRepository;
import com.netflix.latam.peliiculas.Repository.CompraRepository;
import com.netflix.latam.peliiculas.Repository.PeliculaRepository;
import com.netflix.latam.peliiculas.Service.CompraService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompraServiceImpl implements CompraService {

    private final CompraRepository repository;
    private final ClienteRepository clienteRepository;
    private final PeliculaRepository peliculaRepository;
    private final CompraMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<CompraResponseDTO> findAll() {
        return mapper.toResponseDTOList(repository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public CompraResponseDTO findById(Long id) {
        Compra compra = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compra no encontrada en sistema"));
        return mapper.toResponseDTO(compra);
    }

    @Override
    @Transactional
    public CompraResponseDTO save(CompraRequestDTO dto) {
        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado en sistema"));

        Compra compra = mapper.toModel(dto);
        compra.setCliente(cliente);

        List<DetalleCompra> detalles = dto.getDetalles()
                .stream()
                .map(d -> {
                    Peliculas pelicula = peliculaRepository
                            .findById(d.getPeliculaId())
                            .orElseThrow(() -> new RuntimeException("Pelicula no encontrada en sistema"));

                    boolean yaComprada = repository.existsByClienteIdAndDetallesPeliculaId(dto.getClienteId(), d.getPeliculaId());

                    if (yaComprada) {
                        throw new RuntimeException("El cliente ya compro la pelicula: " + pelicula.getNombre());
                    }

                    DetalleCompra detalle = new DetalleCompra();
                    detalle.setPelicula(pelicula);
                    return detalle;
                }).collect(Collectors.toList());

        detalles.forEach(compra::addDetalle);
        return mapper.toResponseDTO(repository.save(compra));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compra no encontrada"));
        repository.deleteById(id);
    }
}

