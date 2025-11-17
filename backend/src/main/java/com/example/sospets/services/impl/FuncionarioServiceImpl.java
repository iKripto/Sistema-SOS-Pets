package com.example.sospets.services.impl;

import com.example.sospets.entities.Funcionario;
import com.example.sospets.repositories.FuncionarioRepo;
import com.example.sospets.services.FuncionarioService;
import com.example.sospets.services.exceptions.ObjectNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioServiceImpl implements FuncionarioService {

    @Autowired
    private FuncionarioRepo repository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public Funcionario create(Funcionario funcionario) {
        return repository.save(mapper.map(funcionario, Funcionario.class));
    }

    public List<Funcionario> findAll(){
        return repository.findAll();
    }

    @Override
    public Funcionario findByCpf(String cpf) {
        Optional<Funcionario> funcionario = repository.findByCpf(cpf);
        return funcionario.orElseThrow(() -> new ObjectNotFoundException("Objeto nao encontrado"));
    }

    @Override
    public Funcionario findByCpfOrNome(String cpf, String nome){
        Optional<Funcionario> funcionario = repository.findByCpfOrNome(cpf, nome);
        return funcionario.orElseThrow(() -> new ObjectNotFoundException("Objeto nao encontrado"));
    }

    @Override
    public Funcionario update(Funcionario funcionario) {
        return repository.save(mapper.map(funcionario, Funcionario.class));
    }

    @Override
    public void delete(String cpf) {
        repository.deleteByCpf(cpf);
    }
}
