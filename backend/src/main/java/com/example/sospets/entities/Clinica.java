package com.example.sospets.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Clinica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nome;
    private String enderco;
    private String telefone;
    private double desconto;

    @OneToMany(mappedBy = "clinica")
    @JsonIgnore
    private List<Atendimento> atendimentos;
}
