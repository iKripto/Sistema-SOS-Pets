package com.example.sospets.controllers;

import com.example.sospets.entities.Clinica;
import com.example.sospets.services.ClinicaService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/clinicas")
public class ClinicaController {

    public static final String ID = "/{id}";

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private ClinicaService service;

    @PostMapping
    public ResponseEntity<Clinica> create (@RequestBody Clinica clinica){
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path(ID)
                .buildAndExpand(service.create(clinica).getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping
    public ResponseEntity<List<Clinica>> findAll(){
        return ResponseEntity.ok().body(service.findAll().stream()
                .map(c -> mapper.map(c, Clinica.class)).collect(Collectors.toList()));
    }

    @GetMapping(value = ID)
    public ResponseEntity<Clinica> findById(@PathVariable Integer id){
        return ResponseEntity.ok().body(mapper.map(service.findById(id), Clinica.class));
    }

    @PutMapping(value = ID)
    public ResponseEntity<Clinica> update(@PathVariable Integer id, @RequestBody Clinica clinica){
        clinica.setId(id);
        return ResponseEntity.ok().body(mapper.map(clinica, Clinica.class));
    }

    @DeleteMapping(value = ID)
    public ResponseEntity<Clinica> delete(@PathVariable Integer id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}
