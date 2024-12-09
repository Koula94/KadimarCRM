package com.kadimar.management.service;

import com.kadimar.management.model.Partner;
import com.kadimar.management.model.PartnerType;
import com.kadimar.management.repository.PartnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PartnerService {
    private final PartnerRepository partnerRepository;

    public List<Partner> getAllPartners() {
        return partnerRepository.findAll();
    }

    public List<Partner> getPartnersByType(PartnerType type) {
        return partnerRepository.findByType(type);
    }

    @Transactional
    public Partner createPartner(Partner partner) {
        if (partnerRepository.existsBySiret(partner.getSiret())) {
            throw new RuntimeException("Partner with this SIRET already exists");
        }
        return partnerRepository.save(partner);
    }

    @Transactional
    public Partner updatePartner(Long id, Partner partner) {
        Partner existingPartner = partnerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Partner not found"));

        // Update fields
        existingPartner.setName(partner.getName());
        existingPartner.setAddress(partner.getAddress());
        existingPartner.setPhone(partner.getPhone());
        existingPartner.setEmail(partner.getEmail());
        existingPartner.setDescription(partner.getDescription());
        existingPartner.setType(partner.getType());

        return partnerRepository.save(existingPartner);
    }

    @Transactional
    public void deletePartner(Long id) {
        partnerRepository.deleteById(id);
    }
}