'use client';

import { useRef, useState, useTransition } from 'react';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { submitContactMessage } from '@/app/actions/contact';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null,
  );

  function handleSubmit(formData: FormData) {
    setStatus(null);
    startTransition(async () => {
      const result = await submitContactMessage(formData);
      if (result.success) {
        formRef.current?.reset();
        setStatus({
          type: 'success',
          text: 'Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.',
        });
      } else {
        setStatus({
          type: 'error',
          text: result.error ?? 'Gagal mengirim pesan. Silakan coba lagi.',
        });
      }
    });
  }

  return (
    <section id="contact" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Hubungi Kami
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-stone-900 md:text-3xl">
            Kirim Pesan atau Pertanyaan
          </h2>
          <p className="mt-3 text-stone-600">
            Ada pertanyaan, ingin reservasi, atau acara khusus? Tinggalkan pesan Anda.
          </p>
        </div>

        {status && (
          <div
            role="status"
            className={`mt-8 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
              status.type === 'success'
                ? 'border-green-200 bg-green-50 text-green-800'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            {status.text}
          </div>
        )}

        <form
          ref={formRef}
          action={handleSubmit}
          className="mt-8 space-y-4 rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              name="name"
              label="Nama Lengkap"
              placeholder="Nama Anda"
              required
              maxLength={100}
            />
            <Input
              name="contact"
              label="Kontak WhatsApp / Email"
              placeholder="08xxxxxxxxxx atau email@contoh.com"
              required
              maxLength={100}
            />
          </div>
          <Input
            name="subject"
            label="Subjek Pesan (Opsional)"
            placeholder="Reservasi, tanya menu, dll."
            maxLength={150}
          />
          <Textarea
            name="message"
            label="Isi Pesan"
            placeholder="Tulis pesan Anda di sini..."
            rows={5}
            required
            maxLength={1000}
          />
          <input
            type="text"
            name="honeypot"
            tabIndex={-1}
            autoComplete="off"
            style={{ display: 'none' }}
            aria-hidden="true"
          />
          <Button type="submit" isLoading={isPending} className="w-full sm:w-auto">
            {!isPending && <Send className="h-4 w-4" />}
            Kirim Pesan
          </Button>
        </form>
      </div>
    </section>
  );
}
