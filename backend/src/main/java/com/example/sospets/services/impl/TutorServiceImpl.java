package com.example.sospets.services.impl;

import com.example.sospets.entities.Tutor;
import com.example.sospets.repositories.TutorRepo;
import com.example.sospets.services.TutorService;
import com.example.sospets.services.exceptions.ObjectNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TutorServiceImpl implements TutorService {

    @Autowired
    private TutorRepo repository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public Tutor create(Tutor tutor) {
        return repository.save(mapper.map(tutor, Tutor.class));
    }

    public List<Tutor> findAll(){
        return repository.findAll();
    }

    @Override
    public Tutor findByCpf(String cpf) {
        Optional<Tutor> tutor = repository.findByCpf(cpf);
        return tutor.orElseThrow(() -> new ObjectNotFoundException("Objeto nao encontrado"));
    }

    @Override
    public Tutor findByCpfOrNome(String cpf, String nome){
        Optional<Tutor> tutor = repository.findByCpfOrNome(cpf, nome);
        return tutor.orElseThrow(() -> new ObjectNotFoundException("Objeto nao encontrado"));
    }

    @Override
    public Tutor update(Tutor tutor) {
        return repository.save(mapper.map(tutor, Tutor.class));
    }

    @Override
    public void delete(String cpf) {
        repository.deleteByCpf(cpf);
    }

}
