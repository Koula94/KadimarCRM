package com.kadimar.management.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;

@Data
@Entity
@Table(name = "clients")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String email;

    private String phone;
    private String address;
    private String company;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @OneToMany(mappedBy = "client")
    private Set<Project> projects;
}
