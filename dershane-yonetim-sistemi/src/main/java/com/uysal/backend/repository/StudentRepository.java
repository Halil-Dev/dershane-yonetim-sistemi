package com.uysal.backend.repository;

import com.uysal.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface StudentRepository extends JpaRepository<Student, UUID> {
    // Kritik Sorgu: Sadece belirli bir kurumun öğrencilerini listeler
    List<Student> findByInstitutionId(UUID institutionId);
}