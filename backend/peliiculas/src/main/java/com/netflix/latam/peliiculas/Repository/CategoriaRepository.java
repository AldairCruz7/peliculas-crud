package com.netflix.latam.peliiculas.Repository;

import com.netflix.latam.peliiculas.Model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    List<Categoria> findAllByEstatus(Boolean b);
}
