package com.robotron.server.service;

import com.robotron.server.dto.device.DeviceCreateRequest;
import com.robotron.server.dto.device.DeviceResponse;
import com.robotron.server.dto.device.DeviceUpdateRequest;
import com.robotron.server.exception.BusinessException;
import com.robotron.server.exception.NotFoundException;
import com.robotron.server.mapper.DeviceMapper;
import com.robotron.server.model.Device;
import com.robotron.server.model.Product;
import com.robotron.server.repository.DeviceRepository;
import com.robotron.server.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {

    private final DeviceRepository deviceRepository;
    private final ProductRepository productRepository;

    public DeviceService(
            DeviceRepository deviceRepository,
            ProductRepository productRepository) {

        this.deviceRepository = deviceRepository;
        this.productRepository = productRepository;
    }

    public List<DeviceResponse> getAllDevices() {

        return deviceRepository.findByActiveTrue()
                .stream()
                .map(DeviceMapper::toResponse)
                .toList();
    }

    public DeviceResponse createDevice(
            DeviceCreateRequest request) {

        if (deviceRepository.existsByInventoryNumberIgnoreCase(
                request.getInventoryNumber())) {

            throw new BusinessException(
                    "Inventarnummer existiert bereits!"
            );
        }

        if (deviceRepository.existsBySerialNumberIgnoreCase(
                request.getSerialNumber())) {

            throw new BusinessException(
                    "Seriennummer existiert bereits!"
            );
        }

        Product product =
                productRepository.findById(
                                request.getProductId())
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Produkt nicht gefunden!"
                                ));

        Device device = new Device();

        device.setProduct(product);
        device.setInventoryNumber(
                request.getInventoryNumber().trim());
        device.setSerialNumber(
                request.getSerialNumber().trim());
        device.setManufacturerAssetTag(
                request.getManufacturerAssetTag());
        device.setPurchaseDate(
                request.getPurchaseDate());
        device.setPurchasePrice(
                request.getPurchasePrice());
        device.setWarrantyUntil(
                request.getWarrantyUntil());
        device.setStatus(
                request.getStatus());
        device.setLocation(
                request.getLocation());
        device.setNotes(
                request.getNotes());
        device.setActive(true);

        Device saved =
                deviceRepository.save(device);

        return DeviceMapper.toResponse(saved);
    }

    public DeviceResponse updateDevice(
            Long id,
            DeviceUpdateRequest request) {

        Device device =
                deviceRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Gerät nicht gefunden!"
                                ));

        Product product =
                productRepository.findById(
                                request.getProductId())
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Produkt nicht gefunden!"
                                ));

        device.setProduct(product);
        device.setInventoryNumber(
                request.getInventoryNumber().trim());
        device.setSerialNumber(
                request.getSerialNumber().trim());
        device.setManufacturerAssetTag(
                request.getManufacturerAssetTag());
        device.setPurchaseDate(
                request.getPurchaseDate());
        device.setPurchasePrice(
                request.getPurchasePrice());
        device.setWarrantyUntil(
                request.getWarrantyUntil());
        device.setStatus(
                request.getStatus());
        device.setLocation(
                request.getLocation());
        device.setNotes(
                request.getNotes());

        Device updated =
                deviceRepository.save(device);

        return DeviceMapper.toResponse(updated);
    }

    public void archiveDevice(Long id) {

        Device device =
                deviceRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Gerät nicht gefunden!"
                                ));

        device.setActive(false);

        deviceRepository.save(device);
    }

    public void restoreDevice(Long id) {

        Device device =
                deviceRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Gerät nicht gefunden!"
                                ));

        device.setActive(true);

        deviceRepository.save(device);
    }

    public void permanentlyDeleteDevice(
            Long id) {

        Device device =
                deviceRepository.findById(id)
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Gerät nicht gefunden!"
                                ));

        deviceRepository.delete(device);
    }
}