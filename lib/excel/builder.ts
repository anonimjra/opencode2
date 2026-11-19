import ExcelJS, { type Workbook, type Worksheet } from 'exceljs';

export type { Workbook, Worksheet };

export const RUPIAH_NUM_FMT = '"Rp"#,##0';

export function createBaseWorkbook(): Workbook {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Sistem Admin UMKM';
  workbook.lastModifiedBy = 'Admin';
  workbook.created = new Date();
  workbook.modified = new Date();
  return workbook;
}

export function applyStandardWorksheetStyling(
  worksheet: Worksheet,
  columnHeaders: string[],
): void {
  const headerRow = worksheet.getRow(1);
  headerRow.height = 30;

  const headerCount = columnHeaders.length || worksheet.columnCount;

  for (let i = 1; i <= headerCount; i += 1) {
    const cell = headerRow.getCell(i);
    cell.font = {
      name: 'Arial',
      size: 11,
      bold: true,
      color: { argb: 'FFFFFFFF' },
    };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF572C15' },
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFD1D5DB' } },
      left: { style: 'thin', color: { argb: 'FFD1D5DB' } },
      bottom: { style: 'thin', color: { argb: 'FFD1D5DB' } },
      right: { style: 'thin', color: { argb: 'FFD1D5DB' } },
    };
  }

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFD1D5DB' } },
        left: { style: 'thin', color: { argb: 'FFD1D5DB' } },
        bottom: { style: 'thin', color: { argb: 'FFD1D5DB' } },
        right: { style: 'thin', color: { argb: 'FFD1D5DB' } },
      };
      cell.font = cell.font ?? { name: 'Arial', size: 10 };
    });
  });

  // Auto-fit column width berdasarkan panjang teks maksimum
  for (let i = 1; i <= worksheet.columnCount; i += 1) {
    let maxLength = 0;
    worksheet.getColumn(i).eachCell({ includeEmpty: false }, (cell) => {
      const value = cell.value;
      const length =
        value === null || value === undefined ? 0 : String(value).length;
      if (length > maxLength) maxLength = length;
    });
    worksheet.getColumn(i).width = Math.max(maxLength + 4, 12);
  }
}

export async function generateBuffer(workbook: Workbook): Promise<Uint8Array> {
  const buffer = await workbook.xlsx.writeBuffer();
  return new Uint8Array(buffer as ArrayBuffer);
}
