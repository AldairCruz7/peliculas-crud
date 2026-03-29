package com.netflix.latam.peliiculas.DTO.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClienteRequestDTO {

    @NotBlank(message = "Nombre cliente es requerido")
    private String nombre;

    @Pattern(
        message = "Teléfono debe tener exactamente 10 dígitos",
        regexp = "^\\d{10}$"
    )
    private String telefono;
}