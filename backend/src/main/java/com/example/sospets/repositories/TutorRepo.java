package com.example.sospets.repositories;

import com.example.sospets.entities.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// CORREÇÃO AQUI: Mudamos de <Tutor, Long> para <Tutor, String>
public interface TutorRepo extends JpaRepository<Tutor, String> {
    
    Optional<Tutor> findByCpfOrNome(String cpf, String nome);
    
    Optional<Tutor> findByCpf(String cpf);
    
    void deleteByCpf(String cpf);
}