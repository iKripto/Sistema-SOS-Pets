package com.example.sospets.services.impl;

import com.example.sospets.entities.Clinica;
import com.example.sospets.repositories.ClinicaRepo;
import com.example.sospets.services.ClinicaService;
import com.example.sospets.services.exceptions.ObjectNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClinicaServiceImpl implements ClinicaService {

    @Autowired
    private ClinicaRepo repository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public Clinica create(Clinica clinica) {
        return repository.save(mapper.map(clinica, Clinica.class));
    }

    public List<Clinica> findAll() {
        return repository.findAll();
    }

    @Override
    public Clinica findById(Integer id) {
        Optional<Clinica> clinica = repository.findById(id);
        return clinica.orElseThrow(()-> new ObjectNotFoundException("Clínica não encontrada"));
    }

    @Override
    public Clinica update(Clinica clinica) {
        return repository.save(mapper.map(clinica, Clinica.class));
    }

    @Override
    public void delete(Integer id) {
        findById(id);
        repository.deleteById(id);
    }
}
