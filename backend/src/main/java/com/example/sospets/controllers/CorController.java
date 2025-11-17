package com.example.sospets.controllers;

import com.example.sospets.entities.Cor;
import com.example.sospets.services.CorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/cor")
public class CorController {

    public static final String ID = "/{id}";

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private CorService service;


    @PostMapping
    public ResponseEntity<Cor> create(@RequestBody Cor cor) {
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path(ID).buildAndExpand(service.create(cor).getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping
    public ResponseEntity<List<Cor>> findAll() {
        return ResponseEntity.ok().body(service.findAll().stream()
                .map(cor -> mapper.map(cor, Cor.class)).collect(Collectors.toList()));
    }

    @GetMapping(value = ID)
    public ResponseEntity<Cor> findById(@PathVariable Integer id) {
        return ResponseEntity.ok().body(mapper.map(service.findById(id), Cor.class));
    }

    @PutMapping(value = ID)
    public ResponseEntity<Cor> update(@PathVariable Integer id, @RequestBody Cor cor) {
        cor.setId(id);
        return ResponseEntity.ok().body(mapper.map(service.update(cor), Cor.class));
    }

    @DeleteMapping(value = ID)
    public ResponseEntity<Cor> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
