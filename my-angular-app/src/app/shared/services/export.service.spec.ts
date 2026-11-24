import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

const {
  writeFileMock,
  jsonToSheetMock,
  bookNewMock,
  bookAppendSheetMock,
  pdfTextMock,
  pdfSetFontSizeMock,
  pdfSaveMock,
  autoTableMock,
} = vi.hoisted(() => ({
  writeFileMock: vi.fn(),
  jsonToSheetMock: vi.fn().mockReturnValue({ '!ref': 'A1:D3' }),
  bookNewMock: vi.fn().mockReturnValue({ SheetNames: ['Export'], Sheets: {} }),
  bookAppendSheetMock: vi.fn(),
  pdfTextMock: vi.fn(),
  pdfSetFontSizeMock: vi.fn(),
  pdfSaveMock: vi.fn(),
  autoTableMock: vi.fn(),
}));

vi.mock('xlsx', () => ({
  utils: {
    json_to_sheet: jsonToSheetMock,
    book_new: bookNewMock,
    book_append_sheet: bookAppendSheetMock,
  },
  writeFile: writeFileMock,
}));

vi.mock('jspdf', () => ({
  jsPDF: vi.fn().mockImplementation(function () {
    return {
      setFontSize: pdfSetFontSizeMock,
      text: pdfTextMock,
      save: pdfSaveMock,
    };
  }),
}));

vi.mock('jspdf-autotable', () => ({
  default: autoTableMock,
}));

import { ExportService } from './export.service';

describe('ExportService', () => {
  let service: ExportService;

  const sampleData = [
    { id: 1, name: 'ThinkPad X1', price: 1899.99, note: null },
    { id: 2, name: 'Dell UltraSharp', price: 649.5, note: undefined },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [ExportService],
    });

    service = TestBed.inject(ExportService);
  });

  describe('exportToCsv', () => {
    it('sollte bei leerem Array abbrechen und keinen Download auslösen', () => {
      // Arrange
      const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');

      // Act
      service.exportToCsv([], 'empty-report');

      // Assert
      expect(createObjectURLSpy).not.toHaveBeenCalled();
    });

    it('sollte CSV-Datei mit Headern, Werten und Dateinamen generieren und Download starten', () => {
      // Arrange
      const mockBlobUrl = 'blob:http://localhost/test-csv-123';
      const createObjectURLSpy = vi
        .spyOn(URL, 'createObjectURL')
        .mockReturnValue(mockBlobUrl);
      const revokeObjectURLSpy = vi
        .spyOn(URL, 'revokeObjectURL')
        .mockImplementation(() => {});

      const clickMock = vi.fn();
      const anchorMock = {
        href: '',
        download: '',
        click: clickMock,
      } as unknown as HTMLAnchorElement;

      const createElementSpy = vi
        .spyOn(document, 'createElement')
        .mockReturnValue(anchorMock);

      // Act
      service.exportToCsv(sampleData, 'products-report');

      // Assert
      expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
      const generatedBlob = createObjectURLSpy.mock.calls[0][0] as Blob;
      expect(generatedBlob).toBeInstanceOf(Blob);
      expect(generatedBlob.type).toContain('text/csv');

      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(anchorMock.href).toBe(mockBlobUrl);
      expect(anchorMock.download).toBe('products-report.csv');
      expect(clickMock).toHaveBeenCalledTimes(1);
      expect(revokeObjectURLSpy).toHaveBeenCalledWith(mockBlobUrl);
    });
  });

  describe('exportToExcel', () => {
    it('sollte bei leerem Array abbrechen und XLSX.writeFile nicht aufrufen', () => {
      // Act
      service.exportToExcel([], 'empty-excel');

      // Assert
      expect(writeFileMock).not.toHaveBeenCalled();
    });

    it('sollte ein Workbook mit Sheet "Export" erstellen und als .xlsx speichern', () => {
      // Act
      service.exportToExcel(sampleData, 'inventory-2026');

      // Assert
      expect(jsonToSheetMock).toHaveBeenCalledWith(sampleData);
      expect(bookNewMock).toHaveBeenCalledTimes(1);
      expect(bookAppendSheetMock).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        'Export'
      );
      expect(writeFileMock).toHaveBeenCalledTimes(1);
      expect(writeFileMock).toHaveBeenCalledWith(
        expect.anything(),
        'inventory-2026.xlsx'
      );
    });
  });

  describe('exportToPdf', () => {
    it('sollte bei leerem Array abbrechen und kein PDF erzeugen', () => {
      // Act
      service.exportToPdf([], 'empty-pdf');

      // Assert
      expect(pdfSaveMock).not.toHaveBeenCalled();
      expect(autoTableMock).not.toHaveBeenCalled();
    });

    it('sollte ein PDF mit Titel, Tabelle (inkl. null/undefined als leerer String) und .pdf-Endung speichern', () => {
      // Act
      service.exportToPdf(sampleData, 'asset-valuation');

      // Assert
      expect(pdfSetFontSizeMock).toHaveBeenCalledWith(16);
      expect(pdfTextMock).toHaveBeenCalledWith('asset-valuation', 14, 15);

      expect(autoTableMock).toHaveBeenCalledTimes(1);
      const autoTableConfig = autoTableMock.mock.calls[0][1];
      expect(autoTableConfig.head).toEqual([['id', 'name', 'price', 'note']]);
      expect(autoTableConfig.body).toEqual([
        ['1', 'ThinkPad X1', '1899.99', ''],
        ['2', 'Dell UltraSharp', '649.5', ''],
      ]);
      expect(autoTableConfig.startY).toBe(25);

      expect(pdfSaveMock).toHaveBeenCalledWith('asset-valuation.pdf');
    });
  });
});
