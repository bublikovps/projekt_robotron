package com.robotron.server.service;

import com.robotron.server.dto.assetmodel.AssetModelCreateRequest;
import com.robotron.server.dto.assetmodel.AssetModelResponse;
import com.robotron.server.dto.assetmodel.AssetModelUpdateRequest;
import com.robotron.server.exception.BusinessException;
import com.robotron.server.exception.NotFoundException;
import com.robotron.server.mapper.AssetModelMapper;
import com.robotron.server.model.AssetModel;
import com.robotron.server.repository.AssetModelRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssetModelService {

    private final AssetModelRepository assetModelRepository;

    public AssetModelService(
            AssetModelRepository assetModelRepository
    ) {
        this.assetModelRepository =
                assetModelRepository;
    }

    public List<AssetModelResponse> getAll() {

        return assetModelRepository
                .findByActiveTrue()
                .stream()
                .map(AssetModelMapper::toResponse)
                .toList();
    }

    public List<AssetModelResponse> getAllActive() {

        return assetModelRepository
                .findByActiveTrue()
                .stream()
                .map(AssetModelMapper::toResponse)
                .toList();

        }

        public List<AssetModelResponse> getAllArchived() {

        return assetModelRepository
                .findByActiveFalse()
                .stream()
                .map(AssetModelMapper::toResponse)
                .toList();

        }

    public AssetModelResponse create(
            AssetModelCreateRequest request
    ) {

        if (
                assetModelRepository
                        .existsByAssetCodeIgnoreCase(
                                request.getAssetCode()
                        )
        ) {

            throw new BusinessException(
                    "Asset Code existiert bereits."
            );
        }

        AssetModel assetModel =
                new AssetModel();

        assetModel.setAssetCode(
                request.getAssetCode().trim()
        );

        assetModel.setName(
                request.getName().trim()
        );

        assetModel.setManufacturer(
                request.getManufacturer().trim()
        );

        assetModel.setAssetCategory(
                request.getAssetCategory().trim()
        );

        assetModel.setDescription(
                request.getDescription()
        );

        assetModel.setDefaultPurchasePrice(
                request.getDefaultPurchasePrice()
        );

        assetModel.setExpectedLifetimeMonths(
                request.getExpectedLifetimeMonths()
        );

        assetModel.setDefaultWarrantyMonths(
                request.getDefaultWarrantyMonths()
        );

        AssetModel saved =
                assetModelRepository.save(
                        assetModel
                );

        return AssetModelMapper.toResponse(
                saved
        );
    }

    public AssetModelResponse update(
            Long id,
            AssetModelUpdateRequest request
    ) {

        AssetModel assetModel =
                assetModelRepository.findById(id)
                        .orElseThrow(
                                () ->
                                        new NotFoundException(
                                                "Asset Model nicht gefunden."
                                        )
                        );

        assetModel.setAssetCode(
                request.getAssetCode().trim()
        );

        assetModel.setName(
                request.getName().trim()
        );

        assetModel.setManufacturer(
                request.getManufacturer().trim()
        );

        assetModel.setAssetCategory(
                request.getAssetCategory().trim()
        );

        assetModel.setDescription(
                request.getDescription()
        );

        assetModel.setDefaultPurchasePrice(
                request.getDefaultPurchasePrice()
        );

        assetModel.setExpectedLifetimeMonths(
                request.getExpectedLifetimeMonths()
        );

        assetModel.setDefaultWarrantyMonths(
                request.getDefaultWarrantyMonths()
        );

        assetModel.setActive(
                request.isActive()
        );

        AssetModel updated =
                assetModelRepository.save(
                        assetModel
                );

        return AssetModelMapper.toResponse(
                updated
        );
    }

    public void archive(
            Long id
    ) {

        AssetModel assetModel =
                assetModelRepository.findById(
                                id
                        )
                        .orElseThrow(
                                () ->
                                        new NotFoundException(
                                                "Asset Model nicht gefunden."
                                        )
                        );

        assetModel.setActive(false);

        assetModelRepository.save(
                assetModel
        );
    }

    public void restore(
            Long id
    ) {

        AssetModel assetModel =
                assetModelRepository.findById(
                                id
                        )
                        .orElseThrow(
                                () ->
                                        new NotFoundException(
                                                "Asset Model nicht gefunden."
                                        )
                        );

        assetModel.setActive(true);

        assetModelRepository.save(
                assetModel
        );
    }
}