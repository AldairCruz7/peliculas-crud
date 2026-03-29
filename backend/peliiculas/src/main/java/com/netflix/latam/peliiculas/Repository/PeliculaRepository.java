package com.netflix.latam.peliiculas.Repository;


import com.netflix.latam.peliiculas.Model.Peliculas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface PeliculaRepository extends JpaRepository<Peliculas, Long> {
    List<Peliculas> findAllByEstatus(Boolean estatus);
}
