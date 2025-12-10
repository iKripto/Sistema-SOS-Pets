package com.example.sospets.services.impl;

import com.example.sospets.entities.Tutor;
import com.example.sospets.repositories.TutorRepo;
import com.example.sospets.services.TutorService;
import com.example.sospets.services.exceptions.ObjectNotFoundException;
import com.example.sospets.validations.Validacoes;
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

    private void validarTutor(Tutor tutor) {
        if (tutor.getCpf() == null || !Validacoes.isValidCPF(tutor.getCpf())) {
            throw new IllegalArgumentException("CPF inválido!");
        }
        if (tutor.getNome() == null || !Validacoes.apenasLetras(tutor.getNome())) {
            throw new IllegalArgumentException("Apenas letras.");
        }

        if (tutor.getTelefone() == null || !Validacoes.validarTelefone(tutor.getTelefone())) {
            throw new IllegalArgumentException("Telefone inválido!");
        }

        if (tutor.getProfissao() == null || !Validacoes.apenasLetras(tutor.getProfissao())) {
            throw new IllegalArgumentException("Apenas letras.");
        }
    }

    @Override
    public Tutor create(Tutor tutor) {
        validarTutor(tutor);
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
        validarTutor(tutor);
        return repository.save(mapper.map(tutor, Tutor.class));
    }

    @Override
    public void delete(String cpf) {
        Tutor tutor = repository.findByCpf(cpf)
                .orElseThrow(() -> new ObjectNotFoundException("Tutor não encontrado"));

        if (tutor.getAnimais() != null && !tutor.getAnimais().isEmpty()) {
            throw new IllegalArgumentException("Tutor possui animais cadastrados e não pode ser excluído");
        }
        repository.delete(tutor);
    }
}
