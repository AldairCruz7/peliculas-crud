package com.netflix.latam.peliiculas.Model;


import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "peliculas" )
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Peliculas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "nombre", nullable = false, length = 30)
    private String nombre;

    @Column(name = "descripcion", length = 100)
    private String descripcion;

    @Column(name = "fecha_publicacion", updatable = false)
    private LocalDate fechaPublicacion;

    @Column(name = "estatus")
    private Boolean estatus = true;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn( name = "categoria_id" )
    private Categoria categoria;

    @OneToMany(mappedBy = "pelicula", fetch = FetchType.LAZY)
    private List<DetalleCompra> detalles = new ArrayList<>();
}
