package com.uysal.backend.repository;

import com.uysal.backend.model.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface InstitutionRepository extends JpaRepository<Institution, UUID> {
}