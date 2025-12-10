package com.example.sospets.controllers;

import com.example.sospets.entities.Voluntario;
import com.example.sospets.services.VoluntarioService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/funcionarios")
public class VoluntarioController {

    public static final String CPF = "/{cpf}";

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private VoluntarioService service;

    @PostMapping
    public ResponseEntity<Voluntario> create(@RequestBody Voluntario voluntario) {
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path(CPF).buildAndExpand(service.create(voluntario).getCpf()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping
    public ResponseEntity<List<Voluntario>> findAll () {
        return ResponseEntity.ok(service.findAll().stream()
                .map(f -> mapper.map(f, Voluntario.class)).collect(Collectors.toList()));
    }

    @GetMapping(value = CPF)
    public ResponseEntity<Voluntario> findByCpf (@PathVariable String cpf) {
        return ResponseEntity.ok().body(mapper.map(service.findByCpf(cpf), Voluntario.class));
    }

    @GetMapping("/buscar")
    public ResponseEntity<Voluntario>
    findByCpfOrNome(@RequestParam (required = false) String cpf, @RequestParam (required = false) String nome){
        return ResponseEntity.ok().body(mapper.map(service.findByCpfOrNome(cpf, nome), Voluntario.class));
    }

    @PutMapping(value = CPF)
    public ResponseEntity<Voluntario> update(@PathVariable String cpf, @RequestBody Voluntario voluntario) {
        voluntario.setCpf(cpf);
        return ResponseEntity.ok().body(mapper.map(service.update(voluntario), Voluntario.class));
    }

    @DeleteMapping(value = CPF)
    public ResponseEntity<Voluntario> delete(@PathVariable String cpf) {
        service.delete(cpf);
        return ResponseEntity.noContent().build();
    }
}
