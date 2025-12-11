package com.example.sospets.repositories;

import com.example.sospets.entities.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FuncionarioRepo extends JpaRepository<Funcionario, Integer> {
    Optional<Funcionario> findByCpfOrNome(String cpf, String nome);
    Optional<Funcionario> findByCpf(String cpf);
    void deleteByCpf(String cpf);
}
