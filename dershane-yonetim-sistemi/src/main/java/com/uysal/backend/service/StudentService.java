package com.uysal.backend.service;

import com.uysal.backend.model.Student;
import com.uysal.backend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository repository;

    public Student save(Student student) {
        return repository.save(student);
    }

    public List<Student> getStudentsByInstitution(UUID instId) {
        return repository.findByInstitutionId(instId);
    }
}