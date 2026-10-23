package com.robotron.server.repository;

import com.robotron.server.model.EmploymentContract;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmploymentContractRepository
        extends JpaRepository<EmploymentContract, Long> {

    List<EmploymentContract> findByActiveTrue();

    boolean existsByContractNumberIgnoreCase(
            String contractNumber);
}