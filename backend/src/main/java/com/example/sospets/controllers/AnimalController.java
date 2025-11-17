package com.example.sospets.controllers;

import com.example.sospets.entities.Animal;
import com.example.sospets.enums.Especie;
import com.example.sospets.services.AnimalService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/animais")
public class AnimalController {

    public static final String ID = "/{id}";
    @Autowired
    private ModelMapper mapper;

    @Autowired
    private AnimalService service;

    @PostMapping
    public ResponseEntity<Animal> create(@RequestBody Animal animal){
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path(ID).buildAndExpand(service.create(animal).getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping
    public ResponseEntity<List<Animal>> findAll(){
        return ResponseEntity.ok().body(service.findAll().stream()
                .map(a -> mapper.map(a, Animal.class)).collect(Collectors.toList()));
    }

    @GetMapping(value = ID)
    public ResponseEntity<Animal> findById(@PathVariable Integer id){
        return ResponseEntity.ok().body(mapper.map(service.findById(id), Animal.class));
    }

    @GetMapping(value = "/busca", params = "nome")
    public ResponseEntity<List<Animal>> findByNomeContainingIgnoreCase(@RequestParam("nome") String nome){
        return ResponseEntity.ok().body(service.findByNomeContainingIgnoreCase(nome).stream()
                .map(a -> mapper.map(a, Animal.class)).collect(Collectors.toList()));
    }

    @GetMapping(value = "/busca", params = {"nome", "especie"})
    public ResponseEntity<List<Animal>>
        findByNomeContainingIgnoreCaseAndEspecie(@RequestParam ("nome") String nome, @RequestParam ("especie") String especie){
        return ResponseEntity.ok().body(service.findByNomeContainingIgnoreCaseAndEspecie(nome, Especie.valueOf(especie)).stream()
                .map(a -> mapper.map(a, Animal.class)).collect(Collectors.toList()));
    }


    @GetMapping(value = "/busca/ordenada", params = {"especie"})
    public ResponseEntity<List<Animal>>
        findByEspecieOrderByNomeDesc(@RequestParam ("especie") String especie){
        return ResponseEntity.ok().body(service.findByEspecieOrderByNomeDesc(Especie.valueOf(especie)));
    }

    @PutMapping(value = ID)
    public ResponseEntity<Animal> update (@PathVariable Integer id, @RequestBody Animal animal){
        animal.setId(id);
        return ResponseEntity.ok().body(mapper.map(service.update(animal), Animal.class));
    }

    @DeleteMapping(value = ID)
    public ResponseEntity<Animal> delete(@PathVariable Integer id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
