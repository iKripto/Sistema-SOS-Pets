package com.example.sospets.repositories;

import com.example.sospets.entities.Atendimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Map; // <-- ADICIONE ESTA LINHA

public interface AtendimentoRepo extends JpaRepository<Atendimento, Integer> {
    
    @Query(value = "SELECT COUNT(*) AS totalAtendimentos, SUM(valor) AS valorTotal FROM atendimento", nativeQuery = true)
    Map<String, Object> getRelatorioMes();
}