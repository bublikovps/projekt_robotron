package com.robotron.server.mapper;

import com.robotron.server.dto.assetmodel.AssetModelResponse;
import com.robotron.server.model.AssetModel;

public class AssetModelMapper {

    private AssetModelMapper() {
    }

    public static AssetModelResponse toResponse(
            AssetModel assetModel
    ) {

        AssetModelResponse response =
                new AssetModelResponse();

        response.setId(
                assetModel.getId()
        );

        response.setAssetCode(
                assetModel.getAssetCode()
        );

        response.setName(
                assetModel.getName()
        );

        response.setManufacturer(
                assetModel.getManufacturer()
        );

        response.setAssetCategory(
                assetModel.getAssetCategory()
        );

        response.setDescription(
                assetModel.getDescription()
        );

        response.setDefaultPurchasePrice(
                assetModel.getDefaultPurchasePrice()
        );

        response.setExpectedLifetimeMonths(
                assetModel.getExpectedLifetimeMonths()
        );

        response.setDefaultWarrantyMonths(
                assetModel.getDefaultWarrantyMonths()
        );

        response.setActive(
                assetModel.isActive()
        );

        return response;
    }
}