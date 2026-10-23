package com.robotron.server.repository;

import com.robotron.server.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeviceRepository
        extends JpaRepository<Device, Long> {

    List<Device> findByActiveTrue();

    boolean existsByInventoryNumberIgnoreCase(
            String inventoryNumber);

    boolean existsBySerialNumberIgnoreCase(
            String serialNumber);
}