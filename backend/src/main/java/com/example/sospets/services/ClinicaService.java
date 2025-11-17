package com.example.sospets.services;

import com.example.sospets.entities.Clinica;

import java.util.List;

public interface ClinicaService {

    Clinica create(Clinica clinica);
    List<Clinica> findAll();
    Clinica findById(Integer id);
    Clinica update(Clinica clinica);
    void delete(Integer id);
}
