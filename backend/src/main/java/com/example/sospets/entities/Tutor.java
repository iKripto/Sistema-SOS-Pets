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
public class Tutor {

    @Id
    private String cpf;
    private String nome;
    private String rg;
    private String endereco;
    private String profissao;
    private String telefone;


    @OneToMany(mappedBy = "tutor")
    @JsonIgnore
    private List<Animal> animais;
}
