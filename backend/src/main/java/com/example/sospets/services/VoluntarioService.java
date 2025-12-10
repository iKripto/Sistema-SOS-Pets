package com.example.sospets.services;

import com.example.sospets.entities.Voluntario;

import java.util.List;

public interface VoluntarioService {

    Voluntario create(Voluntario voluntario);
    List<Voluntario> findAll();
    Voluntario findByCpf(String cpf);
    Voluntario findByCpfOrNome(String cpf, String nome);
    Voluntario update(Voluntario voluntario);
    void delete(String cpf);
}
