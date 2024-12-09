package com.kadimar.management.repository;

import com.kadimar.management.model.Project;
import com.kadimar.management.model.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByStatus(ProjectStatus status);
    List<Project> findByClientId(Long clientId);
    List<Project> findByManagerId(Long managerId);
}