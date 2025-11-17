package com.example.sospets.entities;

import com.example.sospets.enums.Especie;
import com.example.sospets.enums.Porte;
import com.example.sospets.enums.Sexo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nome;
    private String raca;
    private Porte porte;
    private LocalDate dataNascimento;
    private boolean eFilhote;
    private Especie especie;
    private Sexo sexo;
    private boolean statusAcolhimento;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "tutor_id")
    @JsonIgnore
    private Tutor tutor;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "cor_id")
    private Cor cor;

    @OneToMany(mappedBy = "animal")
    @JsonIgnore
    private List<Atendimento> atendimentos;
}
