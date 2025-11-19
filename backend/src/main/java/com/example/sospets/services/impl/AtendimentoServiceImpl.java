package com.example.sospets.services.impl;

// Imports do DTO e utilitários
import com.example.sospets.controllers.dto.RelatorioDTO;
import java.util.Map;

import com.example.sospets.entities.Animal;
import com.example.sospets.entities.Atendimento;
import com.example.sospets.entities.Clinica;
import com.example.sospets.entities.Funcionario;
import com.example.sospets.entities.Tutor; // [NOVO IMPORT]
import com.example.sospets.repositories.AnimalRepo;
import com.example.sospets.repositories.AtendimentoRepo;
import com.example.sospets.repositories.ClinicaRepo;
import com.example.sospets.repositories.FuncionarioRepo;
import com.example.sospets.repositories.TutorRepo; // [NOVO IMPORT]
import com.example.sospets.services.AtendimentoService;
import com.example.sospets.services.exceptions.ObjectNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AtendimentoServiceImpl implements AtendimentoService {

    @Autowired
    private AtendimentoRepo repository;

    @Autowired
    private AnimalRepo animalRepo;

    @Autowired
    private ClinicaRepo clinicaRepo;

    @Autowired
    private FuncionarioRepo funcionarioRepo;
    
    @Autowired
    private TutorRepo tutorRepo; // [INJEÇÃO NOVA]

    @Autowired
    private ModelMapper mapper;

    @Override
    public Atendimento create(Atendimento atendimento) {
        // 1. BUSCA OBRIGATÓRIA DE ANIMAL
        if (atendimento.getAnimal() == null || atendimento.getAnimal().getId() == 0) {
            throw new RuntimeException("Dados do animal são obrigatórios.");
        }
        Animal animal = animalRepo.findById(atendimento.getAnimal().getId())
                .orElseThrow(()-> new ObjectNotFoundException("Animal não encontrado"));
        atendimento.setAnimal(animal);

        // 2. BUSCA OPCIONAL DE CLÍNICA (Correção do Erro de Consulta)
        // Verifica se existe o objeto clinica E se o ID é válido (diferente de 0 ou null)
        if (atendimento.getClinica() != null && atendimento.getClinica().getId() != 0) {
            Clinica clinica = clinicaRepo.findById(atendimento.getClinica().getId())
                    .orElseThrow(() -> new ObjectNotFoundException("Clínica informada não encontrada"));
            atendimento.setClinica(clinica);
        } else {
            // Se não vier clínica, define explicitamente como null para não dar erro ao salvar
            atendimento.setClinica(null);
        }

        // 3. BUSCA OBRIGATÓRIA DE FUNCIONÁRIO
        if (atendimento.getFuncionario() == null || atendimento.getFuncionario().getCpf() == null) {
            throw new RuntimeException("Funcionário responsável é obrigatório.");
        }
        Funcionario funcionario = funcionarioRepo.findByCpf(atendimento.getFuncionario().getCpf())
                .orElseThrow(()-> new RuntimeException("Funcionário não encontrado"));
        atendimento.setFuncionario(funcionario);

        // 4. BUSCA OPCIONAL DE TUTOR (Novo bloco)
        // O Frontend envia o CPF do tutor se ele existir
        if (atendimento.getTutor() != null && atendimento.getTutor().getCpf() != null && !atendimento.getTutor().getCpf().isEmpty()) {
             Tutor tutor = tutorRepo.findById(atendimento.getTutor().getCpf())
                    .orElseThrow(() -> new ObjectNotFoundException("Tutor informado não encontrado"));
             atendimento.setTutor(tutor);
        } else {
             atendimento.setTutor(null);
        }

        return repository.save(mapper.map(atendimento, Atendimento.class));
    }

    public List<Atendimento> findAll() {
        return repository.findAll();
    }

    @Override
    public Atendimento findById(Integer id) {
        Optional<Atendimento> atendimento = repository.findById(id);
        return atendimento.orElseThrow(()-> new ObjectNotFoundException("Atendimento não encontrado"));
    }

    @Override
    public Atendimento update(Atendimento atendimento) {
        // É boa prática garantir que os relacionamentos existam no update também, 
        // mas o save do repositório lida com isso se os IDs estiverem corretos.
        return repository.save(mapper.map(atendimento, Atendimento.class));
    }

    @Override
    public void delete(Integer id) {
        findById(id);
        repository.deleteById(id);
    }

    // --- MÉTODO DO RELATÓRIO ---
    
    @Override
    public RelatorioDTO getRelatorioMes() {
        Map<String, Object> resultado = repository.getRelatorioMes();

        Long totalAtendimentos = 0L;
        if (resultado.get("totalAtendimentos") != null) {
             totalAtendimentos = ((Number) resultado.get("totalAtendimentos")).longValue();
        }
        
        Double valorTotal = 0.0;
        if (resultado.get("valorTotal") != null) {
            valorTotal = ((Number) resultado.get("valorTotal")).doubleValue();
        }

        return new RelatorioDTO(totalAtendimentos, valorTotal);
    }
}