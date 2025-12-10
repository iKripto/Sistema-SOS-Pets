package com.example.sospets.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Tutor {

    @Id
    @NotBlank(message = "CPF é obrigatório")
    private String cpf;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;
    private String rg;
    private String endereco;
    private String profissao;

    @NotBlank(message = "Telefone é obrigatório")
    private String telefone;


    @OneToMany(mappedBy = "tutor")
    @JsonIgnore
    private List<Animal> animais;
}
