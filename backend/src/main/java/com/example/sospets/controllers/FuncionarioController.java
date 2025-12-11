package com.example.sospets.controllers;

import com.example.sospets.entities.Funcionario;
import com.example.sospets.services.FuncionarioService;
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
public class FuncionarioController {

    public static final String CPF = "/{cpf}";

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private FuncionarioService service;

    @PostMapping
    public ResponseEntity<Funcionario> create(@RequestBody Funcionario funcionario) {
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path(CPF).buildAndExpand(service.create(funcionario).getCpf()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping
    public ResponseEntity<List<Funcionario>> findAll () {
        return ResponseEntity.ok(service.findAll().stream()
                .map(f -> mapper.map(f, Funcionario.class)).collect(Collectors.toList()));
    }

    @GetMapping(value = CPF)
    public ResponseEntity<Funcionario> findByCpf (@PathVariable String cpf) {
        return ResponseEntity.ok().body(mapper.map(service.findByCpf(cpf), Funcionario.class));
    }

    @GetMapping("/buscar")
    public ResponseEntity<Funcionario>
    findByCpfOrNome(@RequestParam (required = false) String cpf, @RequestParam (required = false) String nome){
        return ResponseEntity.ok().body(mapper.map(service.findByCpfOrNome(cpf, nome), Funcionario.class));
    }

    @PutMapping(value = CPF)
    public ResponseEntity<Funcionario> update(@PathVariable String cpf, @RequestBody Funcionario funcionario) {
        funcionario.setCpf(cpf);
        return ResponseEntity.ok().body(mapper.map(service.update(funcionario), Funcionario.class));
    }

    @DeleteMapping(value = CPF)
    public ResponseEntity<Funcionario> delete(@PathVariable String cpf) {
        service.delete(cpf);
        return ResponseEntity.noContent().build();
    }
}
