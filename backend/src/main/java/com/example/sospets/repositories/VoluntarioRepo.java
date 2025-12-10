package com.example.sospets.repositories;

import com.example.sospets.entities.Voluntario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VoluntarioRepo extends JpaRepository<Voluntario, Integer> {
    Optional<Voluntario> findByCpfOrNome(String cpf, String nome);
    Optional<Voluntario> findByCpf(String cpf);
    void deleteByCpf(String cpf);
}
