package com.robotron.server.repository;

import com.robotron.server.model.ReturnItem;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReturnItemRepository
        extends JpaRepository<ReturnItem, Long> {
}