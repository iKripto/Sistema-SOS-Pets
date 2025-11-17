package com.example.sospets.services.impl;

import com.example.sospets.entities.Servico;
import com.example.sospets.repositories.ServicoRepo;
import com.example.sospets.services.ServicoService;
import com.example.sospets.services.exceptions.ObjectNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class ServicoServiceImpl implements ServicoService {

    @Autowired
    private ServicoRepo repository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public Servico create(Servico servico) {
        return repository.save(mapper.map(servico, Servico.class));
    }

    public List<Servico> findAll() {
        return repository.findAll();
    }

    @Override
    public Servico findById(@PathVariable Integer id) {
        Optional<Servico> servico = repository.findById(id);
        return servico.orElseThrow(()-> new ObjectNotFoundException("Serviço não encontrado"));
    }

    @Override
    public Servico update(Servico servico) {
        return repository.save(mapper.map(servico, Servico.class));
    }

    @Override
    public void delete(Integer id) {
        findById(id);
        repository.deleteById(id);
    }
}
