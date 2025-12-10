package com.example.sospets.services.impl;

import com.example.sospets.entities.Clinica;
import com.example.sospets.repositories.ClinicaRepo;
import com.example.sospets.services.ClinicaService;
import com.example.sospets.services.exceptions.ObjectNotFoundException;
import com.example.sospets.validations.Validacoes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClinicaServiceImpl implements ClinicaService {

    @Autowired
    private ClinicaRepo repository;

    private void validarClinica(Clinica clinica) {
        if (clinica.getTelefone() == null || !Validacoes.validarTelefone(clinica.getTelefone())) {
            throw new IllegalArgumentException("O número de telefone é inválido.");
        }
    }

    @Override
    public Clinica create(Clinica clinica) {
        validarClinica(clinica);
        return repository.save(clinica);
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
        validarClinica(clinica);
        findById(clinica.getId());
        return repository.save(clinica);
    }

    @Override
    public void delete(Integer id) {
        findById(id);
        repository.deleteById(id);
    }
}
