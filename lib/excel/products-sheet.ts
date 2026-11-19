import type { Product } from '@/types/database';
import {
  type Workbook,
  RUPIAH_NUM_FMT,
  applyStandardWorksheetStyling,
} from './builder';

const HEADERS = [
  'No',
  'Nama Produk',
  'Kategori',
  'Harga (Rp)',
  'Status Ketersediaan',
  'Urutan',
  'Tanggal Dibuat',
];

export function buildProductsWorksheet(
  workbook: Workbook,
  products: Product[],
): void {
  const worksheet = workbook.addWorksheet('Katalog Produk');

  worksheet.columns = [
    { header: 'No', key: 'no', width: 6 },
    { header: 'Nama Produk', key: 'name', width: 28 },
    { header: 'Kategori', key: 'category', width: 20 },
    { header: 'Harga (Rp)', key: 'price', width: 16 },
    { header: 'Status Ketersediaan', key: 'status', width: 18 },
    { header: 'Urutan', key: 'sort_order', width: 10 },
    { header: 'Tanggal Dibuat', key: 'created_at', width: 22 },
  ];

  products.forEach((product, index) => {
    const row = worksheet.addRow({
      no: index + 1,
      name: product.name,
      category: product.category?.name ?? '-',
      price: product.price,
      status: product.is_available ? 'Tersedia' : 'Habis',
      sort_order: product.sort_order,
      created_at: new Date(product.created_at).toLocaleString('id-ID'),
    });
    row.getCell('price').numFmt = RUPIAH_NUM_FMT;
  });

  applyStandardWorksheetStyling(worksheet, HEADERS);
}
