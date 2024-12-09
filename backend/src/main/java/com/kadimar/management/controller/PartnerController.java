package com.kadimar.management.controller;

import com.kadimar.management.model.Partner;
import com.kadimar.management.model.PartnerType;
import com.kadimar.management.service.PartnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partners")
@RequiredArgsConstructor
public class PartnerController {
    private final PartnerService partnerService;

    @GetMapping
    public ResponseEntity<List<Partner>> getAllPartners() {
        return ResponseEntity.ok(partnerService.getAllPartners());
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Partner>> getPartnersByType(@PathVariable PartnerType type) {
        return ResponseEntity.ok(partnerService.getPartnersByType(type));
    }

    @PostMapping
    public ResponseEntity<Partner> createPartner(@RequestBody Partner partner) {
        return ResponseEntity.ok(partnerService.createPartner(partner));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Partner> updatePartner(@PathVariable Long id, @RequestBody Partner partner) {
        return ResponseEntity.ok(partnerService.updatePartner(id, partner));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePartner(@PathVariable Long id) {
        partnerService.deletePartner(id);
        return ResponseEntity.noContent().build();
    }
}