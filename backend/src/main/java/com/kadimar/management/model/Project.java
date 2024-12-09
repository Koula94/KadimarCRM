package com.kadimar.management.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Data
@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private ProjectStatus status;

    @Enumerated(EnumType.STRING)
    private ProjectPriority priority;

    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal budget;
    private Integer progress;
    private String location;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private User manager;

    @ManyToMany
    @JoinTable(
        name = "project_partners",
        joinColumns = @JoinColumn(name = "project_id"),
        inverseJoinColumns = @JoinColumn(name = "partner_id")
    )
    private Set<Partner> partners;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private Set<Document> documents;
}