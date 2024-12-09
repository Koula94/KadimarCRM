package com.kadimar.management.repository;

import com.kadimar.management.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByProjectId(Long projectId);
    List<Document> findByUploadedById(Long userId);
    List<Document> findByProjectIdAndType(Long projectId, String type);
}