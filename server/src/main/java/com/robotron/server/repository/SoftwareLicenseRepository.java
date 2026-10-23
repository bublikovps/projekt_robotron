package com.robotron.server.repository;

import com.robotron.server.model.SoftwareLicense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SoftwareLicenseRepository
        extends JpaRepository<SoftwareLicense, Long> {

    boolean existsByLicenseKey(
            String licenseKey);
}