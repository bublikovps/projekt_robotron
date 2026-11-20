package com.robotron.server.service;

import com.robotron.server.model.SystemSetting;
import com.robotron.server.repository.SystemSettingRepository;

import org.springframework.stereotype.Service;

@Service
public class SystemSettingService {

    private final SystemSettingRepository repository;

    public SystemSettingService(
            SystemSettingRepository repository
    ) {

        this.repository = repository;

    }

    public String getValue(
            String key
    ) {

        return repository
                .findBySettingKey(key)
                .map(SystemSetting::getSettingValue)
                .orElse("");

    }

}