package com.kadimar.management.repository;

import com.kadimar.management.model.Partner;
import com.kadimar.management.model.PartnerType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PartnerRepository extends JpaRepository<Partner, Long> {
    Optional<Partner> findBySiret(String siret);
    List<Partner> findByType(PartnerType type);
    boolean existsBySiret(String siret);
}