package com.example.sospets.services.impl;

import com.example.sospets.entities.Animal;
import com.example.sospets.entities.Cor;
import com.example.sospets.entities.Tutor;
import com.example.sospets.enums.Especie;
import com.example.sospets.repositories.AnimalRepo;
import com.example.sospets.repositories.CorRepo;
import com.example.sospets.repositories.TutorRepo;
import com.example.sospets.services.AnimalService;
import com.example.sospets.services.exceptions.ObjectNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimalServiceImpl implements AnimalService {

    @Autowired
    private AnimalRepo repository;

    @Autowired
    private CorRepo corRepo;

    @Autowired
    private TutorRepo tutorRepo;

    @Autowired
    private ModelMapper mapper;

    // Método auxiliar para buscar Cor e Tutor
    private void setData(Animal animal) {
        // 1. Busca a Cor
        Cor cor = corRepo.findById(animal.getCor().getId())
                .orElseThrow(() -> new ObjectNotFoundException("Cor não encontrada"));
        animal.setCor(cor);

        // 2. Busca o Tutor (se houver)
        if (animal.getTutor() != null && animal.getTutor().getCpf() != null && !animal.getTutor().getCpf().isEmpty()) {
            Tutor tutor = tutorRepo.findByCpf(animal.getTutor().getCpf())
                    .orElseThrow(() -> new ObjectNotFoundException("Tutor não encontrado"));
            animal.setTutor(tutor);
        } else {
            animal.setTutor(null);
        }
    }

    @Override
    public Animal create(Animal animal) {
        setData(animal); // Chama a lógica auxiliar
        return repository.save(mapper.map(animal, Animal.class));
    }

    public List<Animal> findAll() {
        return repository.findAll();
    }

    @Override
    public Animal findById(Integer id) {
        Optional<Animal> animal = repository.findById(id);
        return animal.orElseThrow(()-> new ObjectNotFoundException("Animal não encontrado"));
    }

    @Override
    public List<Animal> findByNomeContainingIgnoreCase(String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
    }

    @Override
    public List<Animal> findByNomeContainingIgnoreCaseAndEspecie(String nome, Especie especie) {
        return repository.findByNomeContainingIgnoreCaseAndEspecie(nome, especie);
    }

    @Override
    public List<Animal> findByEspecieOrderByNomeDesc(Especie especie) {
        return repository.findByEspecieOrderByNomeDesc(especie);
    }

    @Override
    public Animal update(Animal animal) {
        findById(animal.getId()); // Garante que o animal existe
        setData(animal); // Chama a mesma lógica auxiliar do create
        return repository.save(mapper.map(animal, Animal.class));
    }

    public void delete(Integer id){
        findById(id);
        repository.deleteById(id);
    }
}
