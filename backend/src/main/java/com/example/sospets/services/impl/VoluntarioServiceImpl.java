package com.example.sospets.services.impl;

import com.example.sospets.entities.Voluntario;
import com.example.sospets.repositories.VoluntarioRepo;
import com.example.sospets.services.VoluntarioService;
import com.example.sospets.services.exceptions.ObjectNotFoundException;
import com.example.sospets.validations.Validacoes;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoluntarioServiceImpl implements VoluntarioService {

    @Autowired
    private VoluntarioRepo repository;

    @Autowired
    private ModelMapper mapper;

    private void validarVoluntario(Voluntario voluntario) {
        if (voluntario.getCpf() == null || !Validacoes.isValidCPF(voluntario.getCpf())) {
            throw new IllegalArgumentException("CPF inválido!");
        }
        if (voluntario.getNome() == null || !Validacoes.apenasLetras(voluntario.getNome())) {
            throw new IllegalArgumentException("Apenas letras.");
        }

        if (voluntario.getEmail() == null || !Validacoes.validarEmail(voluntario.getEmail())) {
            throw new IllegalArgumentException("Email inválido!");
        }

        if (voluntario.getProfissao() == null || !Validacoes.apenasLetras(voluntario.getProfissao())) {
            throw new IllegalArgumentException("Apenas letras.");
        }
    }

    @Override
    public Voluntario create(Voluntario voluntario) {
        validarVoluntario(voluntario);
        return repository.save(mapper.map(voluntario, Voluntario.class));
    }

    public List<Voluntario> findAll(){
        return repository.findAll();
    }

    @Override
    public Voluntario findByCpf(String cpf) {
        Optional<Voluntario> funcionario = repository.findByCpf(cpf);
        return funcionario.orElseThrow(() -> new ObjectNotFoundException("Objeto nao encontrado"));
    }

    @Override
    public Voluntario findByCpfOrNome(String cpf, String nome){
        Optional<Voluntario> funcionario = repository.findByCpfOrNome(cpf, nome);
        return funcionario.orElseThrow(() -> new ObjectNotFoundException("Objeto nao encontrado"));
    }

    @Override
    public Voluntario update(Voluntario voluntario) {
        validarVoluntario(voluntario);

        Voluntario existente = findByCpf(voluntario.getCpf());

        existente.setNome(voluntario.getNome());
        existente.setEmail(voluntario.getEmail());
        existente.setEndereco(voluntario.getEndereco());
        existente.setProfissao(voluntario.getProfissao());
        existente.setRg(voluntario.getRg());

        // senha e cargo NÃO são atualizados aqui
        return repository.save(existente);
    }


    @Override
    public void delete(String cpf) {
        Voluntario voluntario = findByCpf(cpf);
        if (!voluntario.getAtendimentos().isEmpty()) {
            throw new IllegalStateException("Voluntário possui atendimentos e não pode ser excluído");
        }
        repository.delete(voluntario);
    }

}
