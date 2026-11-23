package com.robotron.server.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "order_id",
            nullable = false
    )
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "product_id",
            nullable = false
    )
    private Product product;

    @Column(
            name = "product_sku_snapshot",
            nullable = false
    )
    private String productSkuSnapshot;

    @Column(
            name = "product_name_snapshot",
            nullable = false
    )
    private String productNameSnapshot;

    @Column(
            nullable = false
    )
    private int quantity;

    @Column(
            name = "unit_price_net",
            nullable = false,
            precision = 10,
            scale = 2
    )
    private BigDecimal unitPriceNet;

    @Column(
            name = "vat_rate",
            nullable = false,
            precision = 5,
            scale = 2
    )
    private BigDecimal vatRate;

    @Column(
            name = "unit_price_gross",
            nullable = false,
            precision = 10,
            scale = 2
    )
    private BigDecimal unitPriceGross;

    public OrderItem() {
    }

    public Long getId() {
        return id;
    }

    public void setId(
            Long id
    ) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(
            Order order
    ) {
        this.order = order;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(
            Product product
    ) {
        this.product = product;
    }

    public String getProductSkuSnapshot() {
        return productSkuSnapshot;
    }

    public void setProductSkuSnapshot(
            String productSkuSnapshot
    ) {
        this.productSkuSnapshot =
                productSkuSnapshot;
    }

    public String getProductNameSnapshot() {
        return productNameSnapshot;
    }

    public void setProductNameSnapshot(
            String productNameSnapshot
    ) {
        this.productNameSnapshot =
                productNameSnapshot;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(
            int quantity
    ) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPriceNet() {
        return unitPriceNet;
    }

    public void setUnitPriceNet(
            BigDecimal unitPriceNet
    ) {
        this.unitPriceNet = unitPriceNet;
    }

    public BigDecimal getVatRate() {
        return vatRate;
    }

    public void setVatRate(
            BigDecimal vatRate
    ) {
        this.vatRate = vatRate;
    }

    public BigDecimal getUnitPriceGross() {
        return unitPriceGross;
    }

    public void setUnitPriceGross(
            BigDecimal unitPriceGross
    ) {
        this.unitPriceGross =
                unitPriceGross;
    }
}