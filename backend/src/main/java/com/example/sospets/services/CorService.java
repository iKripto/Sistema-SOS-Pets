package com.example.sospets.services;

import com.example.sospets.entities.Cor;

import java.util.List;

public interface CorService {

    Cor create(Cor cor);
    List<Cor> findAll();
    Cor findById(Integer id);
    Cor update(Cor cor);
    void delete(Integer id);
}
