package com.kadimar.management.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "partner_contracts")
public class PartnerContract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String reference;

    @ManyToOne
    @JoinColumn(name = "partner_id", nullable = false)
    private Partner partner;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(nullable = false)
    private LocalDate startDate;

    private LocalDate endDate;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(columnDefinition = "TEXT")
    private String scope;

    @Enumerated(EnumType.STRING)
    private ContractStatus status;

    @OneToOne
    private Document contract;
}