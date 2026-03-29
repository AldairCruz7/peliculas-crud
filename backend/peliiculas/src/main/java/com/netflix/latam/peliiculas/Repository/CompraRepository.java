package com.netflix.latam.peliiculas.Repository;

import com.netflix.latam.peliiculas.Model.Compra;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompraRepository extends JpaRepository<Compra, Long> {

    List<Compra> findByClienteId(Long clienteId);

    boolean existsByClienteIdAndDetallesPeliculaId(Long clienteId, Long peliculaId);
}
