package com.example.sospets.repositories;

import com.example.sospets.entities.Animal;
import com.example.sospets.enums.Especie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepo extends JpaRepository<Animal,Integer>{
    List<Animal> findByNomeContainingIgnoreCase(String nome);
    List<Animal> findByNomeContainingIgnoreCaseAndEspecie(String nome, Especie especie);
    List<Animal> findByEspecieOrderByNomeDesc(Especie especie);
}
