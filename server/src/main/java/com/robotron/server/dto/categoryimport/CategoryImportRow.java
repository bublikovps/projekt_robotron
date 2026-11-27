package com.robotron.server.dto.categoryimport;

public class CategoryImportRow {

    private String name;

    public CategoryImportRow() {
    }

    public CategoryImportRow(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}