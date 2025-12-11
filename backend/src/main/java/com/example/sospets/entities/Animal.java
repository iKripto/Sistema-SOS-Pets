package com.example.sospets.entities;

import com.example.sospets.enums.Especie;
import com.example.sospets.enums.Porte;
import com.example.sospets.enums.Sexo;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.PastOrPresent;
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

    @PastOrPresent
    private LocalDate dataNascimento;
    private boolean filhote;
    private Especie especie;
    private Sexo sexo;
    private boolean statusAcolhimento;
    private Boolean castrado;
    
    // --- NOVO CAMPO ---
    @Column(columnDefinition = "TEXT") // Permite textos longos
    private String observacoes;
    // ------------------

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tutor_id")
    private Tutor tutor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cor_id")
    private Cor cor;


    @OneToMany(mappedBy = "animal")
    @JsonIgnore
    private List<Atendimento> atendimentos;
}