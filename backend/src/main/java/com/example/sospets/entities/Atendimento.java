package com.example.sospets.entities;

import com.example.sospets.enums.CusteadoPor;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate; // Importante para as datas

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Atendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String tipo; // castracao, tratamento, adocao

    @Column(columnDefinition = "TEXT")
    private String historico;

    private String statusClinica;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dataGeracao;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dataEstimada;

    private CusteadoPor custeadoPor;
    private String descricao;
    private double valor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "animal_id")
    private Animal animal;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "clinica_id")
    private Clinica clinica;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "voluntario_cpf", nullable = false)
    private Funcionario funcionario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tutor_cpf")
    private Tutor tutor;
}
