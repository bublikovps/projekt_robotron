package com.robotron.server.service;

import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;

import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import com.robotron.server.config.SystemSettings;

import com.robotron.server.exception.NotFoundException;

import com.robotron.server.model.DeliveryNote;
import com.robotron.server.model.Invoice;
import com.robotron.server.model.Order;
import com.robotron.server.model.OrderItem;

import com.robotron.server.repository.DeliveryNoteRepository;
import com.robotron.server.repository.InvoiceRepository;

import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfDocumentService {

    private final InvoiceRepository invoiceRepository;

    private final DeliveryNoteRepository deliveryNoteRepository;

    private final SystemSettingService systemSettingService;

    public PdfDocumentService(
            InvoiceRepository invoiceRepository,
            DeliveryNoteRepository deliveryNoteRepository,
            SystemSettingService systemSettingService
    ) {

        this.invoiceRepository =
                invoiceRepository;

        this.deliveryNoteRepository =
                deliveryNoteRepository;

        this.systemSettingService =
                systemSettingService;

    }

    public byte[] generateInvoicePdf(
            String invoiceNumber
    ) {

        Invoice invoice =
                invoiceRepository
                        .findByInvoiceNumber(
                                invoiceNumber
                        )
                        .orElseThrow(
                                () ->
                                        new NotFoundException(
                                                "Invoice not found."
                                        )
                        );

        Order order =
                invoice.getOrder();

        try {

            ByteArrayOutputStream out =
                    new ByteArrayOutputStream();

            Document document =
                    new Document();

            PdfWriter.getInstance(
                    document,
                    out
            );

            document.open();

            Font titleFont =
                    FontFactory.getFont(
                            FontFactory.HELVETICA_BOLD,
                            18
                    );

            Font sectionFont =
                    FontFactory.getFont(
                            FontFactory.HELVETICA_BOLD,
                            12
                    );

            Font normalFont =
                    FontFactory.getFont(
                            FontFactory.HELVETICA,
                            10
                    );

            document.add(
                    new Paragraph(
                            systemSettingService.getValue(
                                    SystemSettings.COMPANY_NAME
                            ),
                            titleFont
                    )
            );

            document.add(
                    new Paragraph(
                            systemSettingService.getValue(
                                    SystemSettings.COMPANY_STREET
                            ),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            systemSettingService.getValue(
                                    SystemSettings.COMPANY_ZIP
                            )
                                    + " "
                                    + systemSettingService.getValue(
                                            SystemSettings.COMPANY_CITY
                                    ),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            "Telefon: "
                                    + systemSettingService.getValue(
                                            SystemSettings.COMPANY_PHONE
                                    ),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            "E-Mail: "
                                    + systemSettingService.getValue(
                                            SystemSettings.COMPANY_EMAIL
                                    ),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            "Website: "
                                    + systemSettingService.getValue(
                                            SystemSettings.COMPANY_WEBSITE
                                    ),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            "USt-IdNr: "
                                    + systemSettingService.getValue(
                                            SystemSettings.COMPANY_VAT_ID
                                    ),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            "Amtsgericht: "
                                    + systemSettingService.getValue(
                                            SystemSettings.COMPANY_REGISTER_COURT
                                    ),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            "HRB: "
                                    + systemSettingService.getValue(
                                            SystemSettings.COMPANY_REGISTER_NUMBER
                                    ),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            "Geschaeftsfuehrer: "
                                    + systemSettingService.getValue(
                                            SystemSettings.COMPANY_MANAGING_DIRECTOR
                                    ),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(" ")
            );

            document.add(
                    new Paragraph(
                            "RECHNUNG",
                            titleFont
                    )
            );

            document.add(
                    new Paragraph(
                            "Rechnungsnummer: "
                                    + invoice.getInvoiceNumber(),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            "Bestellnummer: "
                                    + order.getOrderNumber(),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            "Rechnungsdatum: "
                                    + invoice.getIssuedAt(),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(" ")
            );

            document.add(
                    new Paragraph(
                            "Kunde",
                            sectionFont
                    )
            );

            if (
                    order.getCompanyName() != null
                            && !order.getCompanyName().isBlank()
            ) {

                document.add(
                        new Paragraph(
                                order.getCompanyName(),
                                normalFont
                        )
                );

            }

            document.add(
                    new Paragraph(
                            order.getVorname()
                                    + " "
                                    + order.getNachname(),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            order.getShippingAddress(),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(" ")
            );

            PdfPTable table =
                    new PdfPTable(5);

            table.setWidthPercentage(
                    100
            );

            table.setWidths(
                    new float[]{
                            20f,
                            40f,
                            10f,
                            15f,
                            15f
                    }
            );

            table.addCell(
                    new PdfPCell(
                            new Phrase("SKU")
                    )
            );

            table.addCell(
                    new PdfPCell(
                            new Phrase("Artikel")
                    )
            );

            table.addCell(
                    new PdfPCell(
                            new Phrase("Menge")
                    )
            );

            table.addCell(
                    new PdfPCell(
                            new Phrase("Netto")
                    )
            );

            table.addCell(
                    new PdfPCell(
                            new Phrase("Brutto")
                    )
            );

            for (
                    OrderItem item
                            : order.getOrderItems()
            ) {

                table.addCell(
                        item.getProductSkuSnapshot()
                );

                table.addCell(
                        item.getProductNameSnapshot()
                );

                table.addCell(
                        String.valueOf(
                                item.getQuantity()
                        )
                );

                table.addCell(
                        item.getUnitPriceNet()
                                .toString()
                );

                table.addCell(
                        item.getUnitPriceGross()
                                .toString()
                );

            }

            document.add(table);

            document.add(
                    new Paragraph(" ")
            );

            document.add(
                    new Paragraph(
                            "Nettobetrag: "
                                    + invoice.getTotalNet()
                                    + " EUR",
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            "Umsatzsteuer (19 %): "
                                    + invoice.getTotalVat()
                                    + " EUR",
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            "Gesamtbetrag: "
                                    + invoice.getTotalGross()
                                    + " EUR",
                            sectionFont
                    )
            );

            document.add(
                    new Paragraph(" ")
            );

            document.add(
                    new Paragraph(
                            systemSettingService.getValue(
                                    SystemSettings.COMPANY_TEST_NOTICE
                            ),
                            normalFont
                    )
            );

            document.close();

            return out.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException(
                    "PDF generation failed.",
                    e
            );

        }

    }

    public byte[] generateDeliveryNotePdf(
            String deliveryNumber
    ) {

        DeliveryNote deliveryNote =
                deliveryNoteRepository
                        .findByDeliveryNumber(
                                deliveryNumber
                        )
                        .orElseThrow(
                                () ->
                                        new NotFoundException(
                                                "Delivery note not found."
                                        )
                        );

        Order order =
                deliveryNote.getOrder();

        try {

            ByteArrayOutputStream out =
                    new ByteArrayOutputStream();

            Document document =
                    new Document();

            PdfWriter.getInstance(
                    document,
                    out
            );

            document.open();

            Font titleFont =
                    FontFactory.getFont(
                            FontFactory.HELVETICA_BOLD,
                            18
                    );

            Font sectionFont =
                    FontFactory.getFont(
                            FontFactory.HELVETICA_BOLD,
                            12
                    );

            Font normalFont =
                    FontFactory.getFont(
                            FontFactory.HELVETICA,
                            10
                    );

            document.add(
                    new Paragraph(
                            systemSettingService.getValue(
                                    SystemSettings.COMPANY_NAME
                            ),
                            titleFont
                    )
            );

            document.add(
                    new Paragraph(" ")
            );

            document.add(
                    new Paragraph(
                            "LIEFERSCHEIN",
                            titleFont
                    )
            );

            document.add(
                    new Paragraph(
                            "Lieferscheinnummer: "
                                    + deliveryNote.getDeliveryNumber(),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            "Bestellnummer: "
                                    + order.getOrderNumber(),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            "Versanddatum: "
                                    + deliveryNote.getShippedAt(),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            "Trackingnummer: "
                                    + deliveryNote.getTrackingNumber(),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(" ")
            );

            PdfPTable table =
                    new PdfPTable(3);

            table.setWidthPercentage(
                    100
            );

            table.addCell("SKU");
            table.addCell("Artikel");
            table.addCell("Menge");

            for (
                    OrderItem item
                            : order.getOrderItems()
            ) {

                table.addCell(
                        item.getProductSkuSnapshot()
                );

                table.addCell(
                        item.getProductNameSnapshot()
                );

                table.addCell(
                        String.valueOf(
                                item.getQuantity()
                        )
                );

            }

            document.add(table);

            document.add(
                    new Paragraph(" ")
            );

            document.add(
                    new Paragraph(
                            "Empfaenger",
                            sectionFont
                    )
            );

            if (
                    order.getCompanyName() != null
                            && !order.getCompanyName().isBlank()
            ) {

                document.add(
                        new Paragraph(
                                order.getCompanyName(),
                                normalFont
                        )
                );

            }

            document.add(
                    new Paragraph(
                            order.getVorname()
                                    + " "
                                    + order.getNachname(),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            order.getShippingAddress(),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(" ")
            );

            document.add(
                    new Paragraph(
                            systemSettingService.getValue(
                                    SystemSettings.COMPANY_TEST_NOTICE
                            ),
                            normalFont
                    )
            );

            document.close();

            return out.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException(
                    "PDF generation failed.",
                    e
            );

        }

    }

}