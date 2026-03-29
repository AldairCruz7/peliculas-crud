package com.netflix.latam.peliiculas.Controller;

import com.netflix.latam.peliiculas.DTO.Request.PeliculaRequestDTO;
import com.netflix.latam.peliiculas.DTO.Response.PeliculaResponseDTO;
import com.netflix.latam.peliiculas.Service.PeliculaService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/peliculas")
public class PeliculaController {

    private final PeliculaService peliculaService;

    public PeliculaController(PeliculaService peliculaService) {
        this.peliculaService = peliculaService;
    }

    @GetMapping
    public ResponseEntity<List<PeliculaResponseDTO>> findAll(@RequestParam Boolean estatus) {
        return ResponseEntity.ok(
                peliculaService.findAllByEstatus(estatus));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PeliculaResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(
                peliculaService.findById(id));
    }

    @PostMapping
    public ResponseEntity<PeliculaResponseDTO> save(@Valid @RequestBody PeliculaRequestDTO dto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(peliculaService.save(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PeliculaResponseDTO> update(@PathVariable Long id, @Valid @RequestBody PeliculaRequestDTO dto) {
        return ResponseEntity.ok(
                peliculaService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        peliculaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}