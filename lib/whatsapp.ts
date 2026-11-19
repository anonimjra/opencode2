import { formatRupiah } from './utils';

export function cleanPhoneNumber(phone: string): string {
  const digits = phone.replace(/[^\d]/g, '');
  if (digits.startsWith('0')) {
    return `62${digits.slice(1)}`;
  }
  if (digits.startsWith('62')) {
    return digits;
  }
  return digits;
}

export function generateWhatsAppOrderLink(options: {
  phone: string;
  brandName: string;
  productName: string;
  price: number;
}): string {
  const { phone, brandName, productName, price } = options;
  const cleaned = cleanPhoneNumber(phone);
  const text = `Halo ${brandName}, saya ingin memesan ${productName} seharga ${formatRupiah(
    price,
  )}. Apakah menu ini masih tersedia hari ini?`;
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(text)}`;
}

export function generateWhatsAppChatLink(
  phone: string,
  message: string,
): string {
  const cleaned = cleanPhoneNumber(phone);
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}
