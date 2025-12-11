package com.example.sospets.services.impl;

import com.example.sospets.entities.Funcionario;
import com.example.sospets.repositories.FuncionarioRepo;
import com.example.sospets.services.FuncionarioService;
import com.example.sospets.services.exceptions.ObjectNotFoundException;
import com.example.sospets.validations.Validacoes;
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

    private void validarVoluntario(Funcionario funcionario) {
        if (funcionario.getCpf() == null || !Validacoes.isValidCPF(funcionario.getCpf())) {
            throw new IllegalArgumentException("CPF inválido!");
        }
        if (funcionario.getNome() == null || !Validacoes.apenasLetras(funcionario.getNome())) {
            throw new IllegalArgumentException("Apenas letras.");
        }

        if (funcionario.getEmail() == null || !Validacoes.validarEmail(funcionario.getEmail())) {
            throw new IllegalArgumentException("Email inválido!");
        }

        if (funcionario.getProfissao() == null || !Validacoes.apenasLetras(funcionario.getProfissao())) {
            throw new IllegalArgumentException("Apenas letras.");
        }
    }

    @Override
    public Funcionario create(Funcionario funcionario) {
        validarVoluntario(funcionario);
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
        validarVoluntario(funcionario);

        Funcionario existente = findByCpf(funcionario.getCpf());

        existente.setNome(funcionario.getNome());
        existente.setEmail(funcionario.getEmail());
        existente.setEndereco(funcionario.getEndereco());
        existente.setProfissao(funcionario.getProfissao());
        existente.setRg(funcionario.getRg());

        // senha e cargo NÃO são atualizados aqui
        return repository.save(existente);
    }


    @Override
    public void delete(String cpf) {
        Funcionario funcionario = findByCpf(cpf);
        if (!funcionario.getAtendimentos().isEmpty()) {
            throw new IllegalStateException("Voluntário possui atendimentos e não pode ser excluído");
        }
        repository.delete(funcionario);
    }

}
