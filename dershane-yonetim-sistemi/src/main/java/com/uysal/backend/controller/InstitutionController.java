package com.uysal.backend.controller;

import com.uysal.backend.model.Institution;
import com.uysal.backend.service.InstitutionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/institutions")
@RequiredArgsConstructor
public class InstitutionController {

    private final InstitutionService service;

    // Veri Kaydetme (POST)
    @PostMapping
    public Institution create(@RequestBody Institution institution) {
        return service.save(institution);
    }

    // Verileri Listeleme (GET) - Tarayıcıdaki 405 hatasını bu çözer
    @GetMapping
    public List<Institution> getAll() {
        return service.findAll();
    }
}