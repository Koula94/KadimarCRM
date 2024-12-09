package com.kadimar.management.service;

import com.kadimar.management.model.Project;
import com.kadimar.management.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    @Transactional
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    @Transactional
    public Project updateProject(Long id, Project project) {
        Project existingProject = getProjectById(id);
        // Update fields
        existingProject.setName(project.getName());
        existingProject.setDescription(project.getDescription());
        existingProject.setStatus(project.getStatus());
        existingProject.setPriority(project.getPriority());
        existingProject.setStartDate(project.getStartDate());
        existingProject.setEndDate(project.getEndDate());
        existingProject.setBudget(project.getBudget());
        existingProject.setProgress(project.getProgress());
        existingProject.setLocation(project.getLocation());
        
        return projectRepository.save(existingProject);
    }

    @Transactional
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}