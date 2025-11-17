package com.example.sospets.services;

import com.example.sospets.entities.Animal;
import com.example.sospets.enums.Especie;

import java.util.List;

public interface AnimalService {

    Animal findById(Integer id);
    List<Animal> findAll();
    List<Animal> findByNomeContainingIgnoreCase(String nome);
    List<Animal> findByNomeContainingIgnoreCaseAndEspecie(String nome, Especie especie);
    List<Animal> findByEspecieOrderByNomeDesc(Especie especie);
    Animal create(Animal animal);
    Animal update(Animal animal);
    void delete(Integer id);
}
