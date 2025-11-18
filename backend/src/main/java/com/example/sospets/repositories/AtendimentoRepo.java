package com.example.sospets.repositories;

import com.example.sospets.entities.Atendimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; // Adicione esta importação
import org.springframework.stereotype.Repository;

import java.util.Map; // Adicione esta importação

@Repository
public interface AtendimentoRepo extends JpaRepository<Atendimento, Integer> {

    // Query nativa para PostgreSQL que calcula o total de atendimentos e o valor total no mês atual
    @Query(value = "SELECT COUNT(a.id) as totalAtendimentos, SUM(a.valor) as valorTotal " +
                   "FROM atendimento a " +
                   "WHERE EXTRACT(MONTH FROM a.data_atendimento) = EXTRACT(MONTH FROM CURRENT_DATE) " +
                   "AND EXTRACT(YEAR FROM a.data_atendimento) = EXTRACT(YEAR FROM CURRENT_DATE)", nativeQuery = true)
    Map<String, Object> getRelatorioMes();
}