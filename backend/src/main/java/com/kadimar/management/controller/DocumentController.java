package com.kadimar.management.controller;

import com.kadimar.management.model.Document;
import com.kadimar.management.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {
    private final DocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<Document> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("projectId") Long projectId,
            @RequestParam("userId") Long userId) throws IOException {
        Document document = documentService.uploadDocument(file, projectId, userId);
        return ResponseEntity.ok(document);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Document>> getProjectDocuments(@PathVariable Long projectId) {
        return ResponseEntity.ok(documentService.getProjectDocuments(projectId));
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadDocument(@PathVariable Long id) throws IOException {
        Document document = documentService.getProjectDocuments(id).get(0);
        Path path = Paths.get(document.getPath());
        Resource resource = new UrlResource(path.toUri());

        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(document.getContentType()))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + document.getName() + "\"")
            .body(resource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id) throws IOException {
        documentService.deleteDocument(id);
        return ResponseEntity.noContent().build();
    }
}