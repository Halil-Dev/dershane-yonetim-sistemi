package com.uysal.backend.service;

import java.util.List;
import com.uysal.backend.model.Institution;
import com.uysal.backend.repository.InstitutionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InstitutionService {
    private final InstitutionRepository repository;

    public Institution save(Institution institution) {
        return repository.save(institution);
    }
    public List<Institution> findAll() {
        return repository.findAll();
    }
}