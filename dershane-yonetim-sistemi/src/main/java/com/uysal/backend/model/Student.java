package com.uysal.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

@Entity
@Table(name = "students")
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private String studentNumber;

    // Hangi kuruma ait olduğunu belirtiyoruz
    @ManyToOne
    @JoinColumn(name = "institution_id", nullable = false)
    private Institution institution;
}