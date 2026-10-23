package com.robotron.server.model;

import jakarta.persistence.*;

@Entity
@Table(name = "permissions")
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            unique = true,
            nullable = false,
            length = 100
    )
    private String name;

    @Column(length = 255)
    private String description;

    public Permission() {
    }

    public Permission(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // ===== Getter / Setter =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String permissionName) {
        this.name = permissionName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String permissionDescription) {
        this.description = permissionDescription;
    }
}