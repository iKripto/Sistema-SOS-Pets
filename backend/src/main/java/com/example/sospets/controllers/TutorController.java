package com.example.sospets.controllers;

import com.example.sospets.entities.Tutor;
import com.example.sospets.services.TutorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/tutores")
public class TutorController {

    public static final String CPF = "/{cpf}";

    @Autowired
    private TutorService service;

    @Autowired
    private ModelMapper mapper;

    @PostMapping
    public ResponseEntity<Tutor> create(@RequestBody Tutor tutor) {
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path(CPF).buildAndExpand(service.create(tutor).getCpf()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping
    public ResponseEntity<List<Tutor>> findAll () {
        return ResponseEntity.ok(service.findAll().stream()
                .map(t -> mapper.map(t, Tutor.class)).collect(Collectors.toList()));
    }

    @GetMapping(value = CPF)
    public ResponseEntity<Tutor> findByCpf (@PathVariable String cpf) {
        return ResponseEntity.ok().body(mapper.map(service.findByCpf(cpf), Tutor.class));
    }

    @GetMapping("/buscar")
    public ResponseEntity<Tutor>
        findByCpfOrNome(@RequestParam (required = false) String cpf, @RequestParam (required = false) String nome){
        return ResponseEntity.ok().body(mapper.map(service.findByCpfOrNome(cpf, nome), Tutor.class));
    }

    @PutMapping(value = CPF)
    public ResponseEntity<Tutor> update(@PathVariable String cpf, @RequestBody Tutor tutor) {
        tutor.setCpf(cpf);
        return ResponseEntity.ok().body(mapper.map(service.update(tutor), Tutor.class));
    }

    @DeleteMapping(value = CPF)
    public ResponseEntity<Tutor> delete(@PathVariable String cpf) {
        service.delete(cpf);
        return ResponseEntity.noContent().build();
    }
}
