# T014 - Tombol Order WhatsApp Melayang & Direct Link

**Depends on:** T007, T008
**Estimasi:** kecil

## Tujuan
Membangun komponen tombol mengambang (Floating Action Button / FAB) WhatsApp (`components/landing/WhatsAppFloatingButton.tsx`) di sudut kanan bawah layar yang selalu dapat diakses untuk komunikasi instan dengan admin kedai.

## Baca dulu
- AGENTS.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/WhatsAppFloatingButton.tsx` : Komponen FAB WhatsApp melayang
- `public/icons/whatsapp.svg` (atau SVG inline Lucide / React Icon kustom)

## Langkah
1. Buat `components/landing/WhatsAppFloatingButton.tsx`.
2. Tandai dengan `'use client'`.
3. Terima props `whatsappNumber: string`, `brandName: string`.
4. Bersihkan nomor telepon menggunakan helper `cleanPhoneNumber(whatsappNumber)`.
5. Siapkan template pesan default pembuka:
   *"Halo {brandName}, saya sedang melihat website Anda dan ingin bertanya mengenai menu/layanan hari ini."*
6. Bangun elemen tautan `<a>`:
   - `href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(pesan)}`}`
   - `target="_blank" rel="noopener noreferrer"`
   - Atribut aksesibilitas: `aria-label="Hubungi kami melalui WhatsApp"`.
   - Posisi & Styling:
     - `fixed bottom-6 right-6 z-50 flex items-center gap-3 group`
     - Tombol lingkaran hijau WhatsApp: `w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300`
     - Lingkaran ping animasi lembut (ping effect): `absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75 pointer-events-none group-hover:opacity-0`
     - Tooltip mengambang di samping tombol: *"Chat dengan Kami"* yang muncul saat kursor mendekat (hover).

## Kriteria selesai
- [ ] Tombol tetap terlihat di sudut kanan bawah saat halaman di-scroll di ponsel maupun desktop.
- [ ] Mengklik tombol membuka aplikasi WhatsApp atau WhatsApp Web pada tab baru dengan pesan pembuka otomatis.
- [ ] Tombol memiliki label aksesibilitas (`aria-label`) dan tidak menutupi elemen krusial form.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Gunakan `z-50` agar tombol selalu berada di atas kartu menu, namun pastikan modal pop-up (jika ada) memiliki level z-index lebih tinggi (`z-60`+) agar tidak bertabrakan.
