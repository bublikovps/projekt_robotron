import { Injectable } from '@angular/core';

import * as XLSX from 'xlsx';

import { jsPDF } from 'jspdf';

import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  exportToCsv(
    data: any[],
    fileName: string
  ): void {

    if (!data.length) {

      return;
    }

    const headers =
      Object.keys(data[0]);

    const csvRows = [

      headers.join(','),

      ...data.map(row =>

        headers
          .map(header =>

            `"${row[header] ?? ''}"`

          )
          .join(',')

      )

    ];

    const csvContent =
      csvRows.join('\n');

    const blob =
      new Blob(

        [csvContent],

        {
          type:
            'text/csv;charset=utf-8;'
        }

      );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        'a'
      );

    link.href = url;

    link.download =
      `${fileName}.csv`;

    link.click();

    URL.revokeObjectURL(url);
  }

  exportToExcel(
    data: any[],
    fileName: string
  ): void {

    if (!data.length) {

      return;
    }

    const worksheet =
      XLSX.utils.json_to_sheet(
        data
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

      workbook,

      worksheet,

      'Export'

    );

    XLSX.writeFile(

      workbook,

      `${fileName}.xlsx`

    );
  }

  exportToPdf(
    data: any[],
    fileName: string
  ): void {

    if (!data.length) {

      return;
    }

    const doc =
      new jsPDF();

    const headers =
      Object.keys(data[0]);

    const rows: string[][] =
      data.map(row =>

        headers.map(header =>

          String(
            row[header] ?? ''
          )

        )

      );

    doc.setFontSize(16);

    doc.text(
      fileName,
      14,
      15
    );

    autoTable(
      doc,
      {
        head: [headers],
        body: rows,
        startY: 25
      }
    );

    doc.save(
      `${fileName}.pdf`
    );
  }

}
