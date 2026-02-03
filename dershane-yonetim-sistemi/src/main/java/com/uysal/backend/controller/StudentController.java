package com.uysal.backend.controller;

import com.uysal.backend.model.Student;
import com.uysal.backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService service;

    @PostMapping
    public Student create(@RequestBody Student student) {
        return service.save(student);
    }

    // Örneğin: /api/students/institution/ID-NUMARASI
    @GetMapping("/institution/{institutionId}")
    public List<Student> getByInstitution(@PathVariable UUID institutionId) {
        return service.getStudentsByInstitution(institutionId);
    }
}