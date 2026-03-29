package com.netflix.latam.peliiculas.Service.implementaciones;

import com.netflix.latam.peliiculas.DTO.Request.PeliculaRequestDTO;
import com.netflix.latam.peliiculas.DTO.Response.PeliculaResponseDTO;
import com.netflix.latam.peliiculas.Mapper.PeliculaMapper;
import com.netflix.latam.peliiculas.Model.Categoria;
import com.netflix.latam.peliiculas.Model.Peliculas;
import com.netflix.latam.peliiculas.Repository.CategoriaRepository;
import com.netflix.latam.peliiculas.Repository.PeliculaRepository;
import com.netflix.latam.peliiculas.Service.PeliculaService;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PeliculaServiceImpl implements PeliculaService {

    private final PeliculaRepository repository;
    private final CategoriaRepository categoriaRepository;
    private final PeliculaMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<PeliculaResponseDTO> findAllByEstatus(Boolean estatus) {
        List<Peliculas> peliculas = repository.findAllByEstatus(estatus);
        return mapper.toResponseDTOList(peliculas);
    }

    @Override
    @Transactional(readOnly = true)
    public PeliculaResponseDTO findById(Long id) {
        Peliculas pelicula = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pelicula no encontrada con id: " + id));
        return mapper.toResponseDTO(pelicula);
    }

    @Override
    @Transactional
    public PeliculaResponseDTO save(PeliculaRequestDTO dto) {
        Categoria categoria = categoriaRepository
                .findById(dto.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria no encontrada con id: " + dto.getCategoriaId()));
        Peliculas pelicula = mapper.toModel(dto);
        pelicula.setCategoria(categoria);
        return mapper.toResponseDTO(repository.save(pelicula));
    }

    @Override
    @Transactional
    public PeliculaResponseDTO update(Long id, PeliculaRequestDTO dto) {
        Peliculas pelicula = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pelicula no encontrada con id: " + id));
        Categoria categoria = categoriaRepository
                .findById(dto.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria no encontrada con id: " + dto.getCategoriaId()));
        pelicula.setNombre(dto.getNombre());
        pelicula.setDescripcion(dto.getDescripcion());
        pelicula.setFechaPublicacion(dto.getFechaPublicacion());
        pelicula.setCategoria(categoria);
        return mapper.toResponseDTO(repository.save(pelicula));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Peliculas pelicula = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pelicula no encontrada con id: " + id));
        pelicula.setEstatus(false);
        repository.save(pelicula);
    }
}