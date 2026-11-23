package com.robotron.server.controller;

import com.robotron.server.dto.document.MyDeliveryNoteResponse;
import com.robotron.server.dto.document.MyInvoiceResponse;

import com.robotron.server.service.DocumentService;
import com.robotron.server.service.PdfDocumentService;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final PdfDocumentService pdfDocumentService;

    private final DocumentService documentService;

    public DocumentController(
            PdfDocumentService pdfDocumentService,
            DocumentService documentService
    ) {

        this.pdfDocumentService =
                pdfDocumentService;

        this.documentService =
                documentService;

    }

    @GetMapping("/my-invoices")
    public ResponseEntity<
            List<MyInvoiceResponse>
            >
    getMyInvoices() {

        return ResponseEntity.ok(
                documentService
                        .getMyInvoices()
        );

    }

    @GetMapping("/my-delivery-notes")
    public ResponseEntity<
            List<MyDeliveryNoteResponse>
            >
    getMyDeliveryNotes() {

        return ResponseEntity.ok(
                documentService
                        .getMyDeliveryNotes()
        );

    }

    @GetMapping(
            "/invoices/{invoiceNumber}/pdf"
    )
    public ResponseEntity<byte[]>
    downloadInvoicePdf(
            @PathVariable
            String invoiceNumber
    ) {

        byte[] pdf =
                pdfDocumentService
                        .generateInvoicePdf(
                                invoiceNumber
                        );

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=invoice-"
                                + invoiceNumber
                                + ".pdf"
                )
                .contentType(
                        MediaType.APPLICATION_PDF
                )
                .body(pdf);

    }

    @GetMapping(
            "/delivery-notes/{deliveryNumber}/pdf"
    )
    public ResponseEntity<byte[]>
    downloadDeliveryNotePdf(
            @PathVariable
            String deliveryNumber
    ) {

        byte[] pdf =
                pdfDocumentService
                        .generateDeliveryNotePdf(
                                deliveryNumber
                        );

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=delivery-note-"
                                + deliveryNumber
                                + ".pdf"
                )
                .contentType(
                        MediaType.APPLICATION_PDF
                )
                .body(pdf);

    }

}