package com.example.sospets.services;

import com.example.sospets.controllers.dto.RelatorioDTO;
import com.example.sospets.entities.Atendimento;

import java.util.List;

public interface AtendimentoService {
    Atendimento create(Atendimento atendimento);
    List<Atendimento> findAll();
    Atendimento findById (Integer id);
    Atendimento update (Atendimento atendimento);
    void delete(Integer id);
    RelatorioDTO getRelatorioMes();
}
