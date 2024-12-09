package com.kadimar.management.service;

import com.kadimar.management.model.Document;
import com.kadimar.management.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DocumentService {
    private final DocumentRepository documentRepository;
    private final String uploadDir = "uploads";

    @Transactional
    public Document uploadDocument(MultipartFile file, Long projectId, Long userId) throws IOException {
        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String filename = UUID.randomUUID().toString() + extension;

        // Save file to disk
        Path filePath = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(), filePath);

        // Create document record
        Document document = new Document();
        document.setName(originalFilename);
        document.setPath(filePath.toString());
        document.setSize(file.getSize());
        document.setContentType(file.getContentType());
        // Set other fields...

        return documentRepository.save(document);
    }

    public List<Document> getProjectDocuments(Long projectId) {
        return documentRepository.findByProjectId(projectId);
    }

    @Transactional
    public void deleteDocument(Long id) throws IOException {
        Document document = documentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Document not found"));

        // Delete file from disk
        Files.deleteIfExists(Paths.get(document.getPath()));

        // Delete database record
        documentRepository.delete(document);
    }
}