package com.netflix.latam.peliiculas.Controller;

import com.netflix.latam.peliiculas.DTO.Request.CategoriaRequestDTO;
import com.netflix.latam.peliiculas.DTO.Response.CategoriaResponseDTO;
import com.netflix.latam.peliiculas.Service.CategoriaService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @GetMapping
    public ResponseEntity<List<CategoriaResponseDTO>> get(@RequestParam  Boolean estatus) {
        return  new ResponseEntity<>(categoriaService.findAllByEstatus(estatus), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CategoriaResponseDTO> create(@Valid @RequestBody CategoriaRequestDTO cDto) {
        return new ResponseEntity<>(categoriaService.save(cDto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaResponseDTO> update(@RequestBody CategoriaRequestDTO cDto, @PathVariable Long id) {
        return ResponseEntity.ok(categoriaService.update(id, cDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoriaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
