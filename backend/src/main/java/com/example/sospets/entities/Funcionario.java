package com.example.sospets.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Funcionario {
    @Id
    private String cpf;
    private String nome;
    private String rg;
    private String email;
    private String profissao;
    private String endereco;

    // NOVOS CAMPOS PARA AUTENTICAÇÃO E LÓGICA DO SISTEMA
    private String senha;
    private String cargo; 
    // FIM DOS NOVOS CAMPOS

    // CORREÇÃO AQUI: mappedBy deve ser "funcionario"
    @OneToMany(mappedBy = "funcionario") 
    @JsonIgnore
    private List<Atendimento> atendimentos;
}
