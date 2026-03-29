package com.netflix.latam.peliiculas.Service.implementaciones;


import com.netflix.latam.peliiculas.DTO.Request.CategoriaRequestDTO;
import com.netflix.latam.peliiculas.DTO.Response.CategoriaResponseDTO;
import com.netflix.latam.peliiculas.Mapper.CategoriaMapper;
import com.netflix.latam.peliiculas.Model.Categoria;
import com.netflix.latam.peliiculas.Repository.CategoriaRepository;
import com.netflix.latam.peliiculas.Service.CategoriaService;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriaServiceImp implements CategoriaService {

    private final CategoriaRepository repository;
    private final CategoriaMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<CategoriaResponseDTO> findAllByEstatus(Boolean b) {
        List<Categoria> categorias = repository.findAllByEstatus(b);
        return mapper.toResponseDTOList(categorias);
    }

    @Override
    @Transactional(readOnly = true)
    public CategoriaResponseDTO findById(Long id) {
        Categoria categoria =  repository.findById(id)
               .orElseThrow(() ->  new RuntimeException("Categoria no encontrada"));
        return mapper.toResponseDTO(categoria);

    }

    @Override
    @Transactional
    public CategoriaResponseDTO save(CategoriaRequestDTO cDto) {
        Categoria categoria = mapper.toModel(cDto);
        return mapper.toResponseDTO(repository.save(categoria));
    }

    @Override
    @Transactional
    public CategoriaResponseDTO update(Long id, CategoriaRequestDTO cDto) {
        Categoria categoria = repository.findById(id)
                .orElseThrow(() ->  new RuntimeException("Categoria no encontrada"));
        categoria.setNombre(cDto.getNombre());
        categoria.setDescripcion(cDto.getDescripcion());
        return mapper.toResponseDTO(repository.save(categoria));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Categoria categoria = repository.findById(id)
                .orElseThrow(() ->  new RuntimeException("Categoria no encontrada"));
        categoria.setEstatus(false);
        repository.save(categoria);
    }
}
