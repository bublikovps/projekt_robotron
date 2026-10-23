package com.robotron.server.service;

import com.robotron.server.dto.softwarelicense.SoftwareLicenseCreateRequest;
import com.robotron.server.dto.softwarelicense.SoftwareLicenseResponse;
import com.robotron.server.dto.softwarelicense.SoftwareLicenseUpdateRequest;
import com.robotron.server.exception.BusinessException;
import com.robotron.server.exception.NotFoundException;
import com.robotron.server.mapper.SoftwareLicenseMapper;
import com.robotron.server.model.SoftwareLicense;
import com.robotron.server.repository.SoftwareLicenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SoftwareLicenseService {

    private final SoftwareLicenseRepository repository;

    public SoftwareLicenseService(
            SoftwareLicenseRepository repository) {

        this.repository = repository;
    }

    public SoftwareLicenseResponse create(
            SoftwareLicenseCreateRequest request) {

        if (repository.existsByLicenseKey(
                request.getLicenseKey())) {

            throw new BusinessException(
                    "License key already exists");
        }

        SoftwareLicense license =
                new SoftwareLicense();

        license.setLicenseKey(
                request.getLicenseKey());

        license.setSoftwareName(
                request.getSoftwareName());

        license.setVendor(
                request.getVendor());

        license.setLicenseType(
                request.getLicenseType());

        license.setQuantity(
                request.getQuantity());

        license.setPurchaseDate(
                request.getPurchaseDate());

        license.setExpirationDate(
                request.getExpirationDate());

        license.setNotes(
                request.getNotes());

        SoftwareLicense saved =
                repository.save(license);

        return SoftwareLicenseMapper
                .toResponse(saved);
    }

    public List<SoftwareLicenseResponse> getAll() {

        return repository.findAll()
                .stream()
                .map(
                        SoftwareLicenseMapper::toResponse)
                .toList();
    }

    public SoftwareLicenseResponse getById(
            Long id) {

        SoftwareLicense license =
                repository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Software license not found"));

        return SoftwareLicenseMapper
                .toResponse(license);
    }

    public SoftwareLicenseResponse update(
            Long id,
            SoftwareLicenseUpdateRequest request) {

        SoftwareLicense license =
                repository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Software license not found"));

        license.setSoftwareName(
                request.getSoftwareName());

        license.setVendor(
                request.getVendor());

        license.setLicenseType(
                request.getLicenseType());

        license.setQuantity(
                request.getQuantity());

        license.setPurchaseDate(
                request.getPurchaseDate());

        license.setExpirationDate(
                request.getExpirationDate());

        license.setNotes(
                request.getNotes());

        license.setActive(
                request.isActive());

        SoftwareLicense saved =
                repository.save(license);

        return SoftwareLicenseMapper
                .toResponse(saved);
    }

    public void deactivate(Long id) {

        SoftwareLicense license =
                repository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Software license not found"));

        license.setActive(false);

        repository.save(license);
    }
}