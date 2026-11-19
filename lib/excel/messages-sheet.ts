import type { ContactMessage } from '@/types/database';
import { type Workbook, applyStandardWorksheetStyling } from './builder';

const HEADERS = [
  'No',
  'Tanggal Masuk',
  'Nama Pengirim',
  'Kontak (WA/Email)',
  'Subjek',
  'Isi Pesan',
  'Status Baca',
];

export function buildMessagesWorksheet(
  workbook: Workbook,
  messages: ContactMessage[],
): void {
  const worksheet = workbook.addWorksheet('Pesan Masuk Pelanggan');

  worksheet.columns = [
    { header: 'No', key: 'no', width: 6 },
    { header: 'Tanggal Masuk', key: 'created_at', width: 22 },
    { header: 'Nama Pengirim', key: 'name', width: 25 },
    { header: 'Kontak (WA/Email)', key: 'contact', width: 24 },
    { header: 'Subjek', key: 'subject', width: 25 },
    { header: 'Isi Pesan', key: 'message', width: 45 },
    { header: 'Status Baca', key: 'status', width: 16 },
  ];

  messages.forEach((message, index) => {
    const row = worksheet.addRow({
      no: index + 1,
      created_at: new Date(message.created_at).toLocaleString('id-ID'),
      name: message.name,
      contact: message.contact,
      subject: message.subject ?? '-',
      message: message.message,
      status: message.is_read ? 'Sudah Dibaca' : 'Belum Dibaca',
    });
    row.getCell('message').alignment = { wrapText: true, vertical: 'top' };
  });

  applyStandardWorksheetStyling(worksheet, HEADERS);
}
