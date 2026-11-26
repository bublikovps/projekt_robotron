package com.robotron.server.repository;

import com.robotron.server.model.AssetModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetModelRepository
        extends JpaRepository<AssetModel, Long> {

    List<AssetModel> findByActiveTrue();

    List<AssetModel> findByActiveFalse();

    boolean existsByAssetCodeIgnoreCase(
            String assetCode
    );
}