package com.example.sospets.services;

import com.example.sospets.entities.Servico;

import java.util.List;

public interface ServicoService {

    Servico create(Servico servico);
    List<Servico> findAll();
    Servico findById(Integer id);
    Servico update(Servico servico);
    void delete(Integer id);
}
