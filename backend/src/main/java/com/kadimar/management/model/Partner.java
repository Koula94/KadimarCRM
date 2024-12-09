package com.kadimar.management.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;

@Data
@Entity
@Table(name = "partners")
public class Partner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String siret;

    private String address;
    private String phone;
    private String email;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private PartnerType type;

    @ManyToMany(mappedBy = "partners")
    private Set<Project> projects;

    @OneToMany(mappedBy = "partner")
    private Set<PartnerContract> contracts;
}