package com.netflix.latam.peliiculas.Repository;

import com.netflix.latam.peliiculas.Model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    List<Cliente> findAllByEstatus(Boolean estatus);
}
