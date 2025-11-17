package com.example.sospets.services;

import com.example.sospets.entities.Tutor;

import java.util.List;

public interface TutorService {

    Tutor create(Tutor tutor);
    List<Tutor> findAll();
    Tutor findByCpf(String cpf);
    Tutor findByCpfOrNome(String cpf, String nome);
    Tutor update(Tutor tutor);
    void delete(String cpf);
}
