package com.example.sospets.controllers;

import com.example.sospets.entities.Servico;
import com.example.sospets.services.ServicoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/servicos")
public class ServicoController {

    public static final String ID = "/{id}";

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private ServicoService service;

    @PostMapping
    public ResponseEntity<Servico> create(@RequestBody Servico servico) {
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path(ID).buildAndExpand(service.create(servico).getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping
    public ResponseEntity<List<Servico>> findAll(){
        return ResponseEntity.ok().body(service.findAll().stream()
                .map(s -> mapper.map(s, Servico.class)).collect(Collectors.toList()));
    }

    @GetMapping(value = ID)
    public ResponseEntity<Servico> findById(@PathVariable Integer id){
        return ResponseEntity.ok().body(mapper.map(service.findById(id), Servico.class));
    }

    @PutMapping(value = ID)
    public ResponseEntity<Servico> update(@PathVariable Integer id, @RequestBody Servico servico) {
        servico.setId(id);
        return ResponseEntity.ok().body(mapper.map(service.update(servico), Servico.class));
    }

    @DeleteMapping(value = ID)
    public ResponseEntity<Servico> delete(@PathVariable Integer id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
