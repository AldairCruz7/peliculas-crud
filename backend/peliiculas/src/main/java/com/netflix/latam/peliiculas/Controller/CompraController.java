package com.netflix.latam.peliiculas.Controller;

import com.netflix.latam.peliiculas.DTO.Request.CompraRequestDTO;
import com.netflix.latam.peliiculas.DTO.Response.CompraResponseDTO;
import com.netflix.latam.peliiculas.Service.CompraService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/compras")
public class CompraController {

    private final CompraService compraService;

    public CompraController(CompraService compraService) {
        this.compraService = compraService;
    }

    @GetMapping
    public ResponseEntity<List<CompraResponseDTO>> findAll() {
        return ResponseEntity.ok(compraService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompraResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(compraService.findById(id));
    }

    @PostMapping
    public ResponseEntity<CompraResponseDTO> save(@Valid @RequestBody CompraRequestDTO dto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(compraService.save(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        compraService.delete(id);
        return ResponseEntity.noContent().build();
    }
}