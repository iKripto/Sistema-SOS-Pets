package com.example.sospets.entities;

import com.example.sospets.enums.CusteadoPor;
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

    // --- Campos Novos (Vindos do Frontend) ---
    private String tipo; // castracao, tratamento, adocao
    
    @Column(columnDefinition = "TEXT") // Para textos longos
    private String historico; 
    
    private String statusClinica; // aguardando, etc.

    private LocalDate dataGeracao;
    private LocalDate dataEstimada;

    // --- Campos Antigos (Mantenha se for usar, senão pode remover) ---
    private CusteadoPor custeadoPor;
    private String descricao;
    private double valor;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "animal_id")
    private Animal animal;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "clinica_id")
    private Clinica clinica;

    @ManyToOne(cascade =  CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "funcionario_id")
    private Voluntario voluntario;

    // O Frontend envia Tutor, precisamos mapear
    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "tutor_cpf") // Ou o nome da coluna correta do seu banco
    private Tutor tutor;
}