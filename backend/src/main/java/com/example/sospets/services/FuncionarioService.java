package com.example.sospets.services;

import com.example.sospets.entities.Funcionario;

import java.util.List;

public interface FuncionarioService {

    Funcionario create(Funcionario funcionario);
    List<Funcionario> findAll();
    Funcionario findByCpf(String cpf);
    Funcionario findByCpfOrNome(String cpf, String nome);
    Funcionario update(Funcionario funcionario);
    void delete(String cpf);
}
