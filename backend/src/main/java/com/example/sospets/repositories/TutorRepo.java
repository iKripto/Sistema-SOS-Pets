package com.example.sospets.repositories;

import com.example.sospets.entities.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TutorRepo extends JpaRepository<Tutor,Long> {
    Optional<Tutor> findByCpfOrNome(String cpf, String nome);
    Optional<Tutor> findByCpf(String cpf);
    void deleteByCpf(String cpf);
}
