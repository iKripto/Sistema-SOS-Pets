package com.example.sospets.services.impl;

import com.example.sospets.entities.Cor;
import com.example.sospets.repositories.CorRepo;
import com.example.sospets.services.CorService;
import com.example.sospets.services.exceptions.ObjectNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CorServiceImpl implements CorService {

    @Autowired
    private CorRepo repository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public Cor create(Cor cor) {
        return repository.save(mapper.map(cor, Cor.class));
    }

    public List<Cor> findAll() {
        return repository.findAll();
    }

    @Override
    public Cor findById(Integer id) {
        Optional<Cor> cor = repository.findById(id);
        return cor.orElseThrow(()-> new ObjectNotFoundException("Cor não encontrada"));
    }

    @Override
    public Cor update(Cor cor) {
        return repository.save(mapper.map(cor, Cor.class));
    }

    public void delete(Integer id) {
        findById(id);
        repository.deleteById(id);
    }
}
