package com.example.sospets.controllers;

// Importação do novo DTO
import com.example.sospets.controllers.dto.RelatorioDTO; 

import com.example.sospets.entities.Atendimento;
import com.example.sospets.services.AtendimentoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/atendimentos")
public class AtendimentoController {

    public static final String ID = "/{id}";

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private AtendimentoService service;

    @PostMapping
    public ResponseEntity<Atendimento> create(@RequestBody Atendimento atendimento) {
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path(ID).buildAndExpand(service.create(atendimento).getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping
    public ResponseEntity<List<Atendimento>> findAll(){
        return ResponseEntity.ok().body(service.findAll().stream()
                .map(a -> mapper.map(a, Atendimento.class)).collect(Collectors.toList()));
    }

    @GetMapping(value = ID)
    public ResponseEntity<Atendimento> findById (@PathVariable Integer id){
        return ResponseEntity.ok().body(mapper.map(service.findById(id), Atendimento.class));
    }

    // --- NOVO ENDPOINT ADICIONADO ---
    /**
     * Endpoint para buscar os dados agregados do relatório de atendimentos.
     * Mapeado para GET /atendimentos/relatorio-mes
     */
    @GetMapping("/relatorio-mes")
    public ResponseEntity<RelatorioDTO> getRelatorio() {
        return ResponseEntity.ok(service.getRelatorioMes());
    }
    // --- FIM DO NOVO ENDPOINT ---

    @PutMapping(value = ID)
    public ResponseEntity<Atendimento> update(@PathVariable Integer id, @RequestBody Atendimento atendimento) {
        atendimento.setId(id);
        return ResponseEntity.ok().body(mapper.map(service.update(atendimento), Atendimento.class));
    }

    // --- CORREÇÃO ---
    // Adicionada a anotação @DeleteMapping para que este método seja um endpoint HTTP
    @DeleteMapping(value = ID)
    public ResponseEntity<Void> delete(@PathVariable Integer id){ // Mudado para ResponseEntity<Void> (padrão para noContent)
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}