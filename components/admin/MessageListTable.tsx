'use client';

import { useMemo, useState, useTransition } from 'react';
import {
  Mail,
  MailOpen,
  Trash2,
  MessageCircle,
  Eye,
  AlertCircle,
} from 'lucide-react';
import type { ContactMessage } from '@/types/database';
import { formatDateIndonesia, cn } from '@/lib/utils';
import { cleanPhoneNumber } from '@/lib/whatsapp';
import { markMessageAsRead, deleteMessage } from '@/app/actions/messages';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

type MessageListTableProps = {
  messages: ContactMessage[];
  exportSlot?: React.ReactNode;
};

function isEmail(value: string): boolean {
  return value.includes('@');
}

export function MessageListTable({ messages, exportSlot }: MessageListTableProps) {
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [active, setActive] = useState<ContactMessage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);
  const [readOverrides, setReadOverrides] = useState<Record<string, boolean>>({});

  const unreadCount = messages.filter(
    (m) => !(readOverrides[m.id] ?? m.is_read),
  ).length;

  const filtered = useMemo(() => {
    return messages.filter((m) => {
      const isRead = readOverrides[m.id] ?? m.is_read;
      if (filter === 'unread') return !isRead;
      if (filter === 'read') return isRead;
      return true;
    });
  }, [messages, filter, readOverrides]);

  function openMessage(message: ContactMessage) {
    setActive(message);
    const isRead = readOverrides[message.id] ?? message.is_read;
    if (!isRead) {
      setReadOverrides((prev) => ({ ...prev, [message.id]: true }));
      startTransition(async () => {
        await markMessageAsRead(message.id, true);
      });
    }
  }

  function toggleRead(message: ContactMessage) {
    const current = readOverrides[message.id] ?? message.is_read;
    const next = !current;
    setReadOverrides((prev) => ({ ...prev, [message.id]: next }));
    startTransition(async () => {
      const result = await markMessageAsRead(message.id, next);
      if (!result.success) {
        setReadOverrides((prev) => ({ ...prev, [message.id]: current }));
      }
    });
  }

  function contactLink(contact: string) {
    if (isEmail(contact)) {
      return { href: `mailto:${contact}`, external: false };
    }
    return {
      href: `https://wa.me/${cleanPhoneNumber(contact)}`,
      external: true,
    };
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      await deleteMessage(deleteTarget.id);
      setDeleteTarget(null);
    });
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-900">Kotak Pesan Masuk</h1>
          <p className="text-sm text-stone-500">
            {unreadCount > 0
              ? `${unreadCount} pesan belum dibaca`
              : 'Semua pesan sudah dibaca'}
          </p>
        </div>
        {exportSlot}
      </div>

      <div className="mb-4 flex gap-2">
        {(
          [
            { key: 'all', label: 'Semua Pesan' },
            { key: 'unread', label: `Belum Dibaca (${unreadCount})` },
            { key: 'read', label: 'Sudah Dibaca' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors focus-ring',
              filter === tab.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-white text-stone-600 hover:bg-stone-100',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
            <tr>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Pengirim</th>
              <th className="px-4 py-3">Subjek &amp; Cuplikan</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-stone-500">
                  Tidak ada pesan.
                </td>
              </tr>
            ) : (
              filtered.map((message) => {
                const isRead = readOverrides[message.id] ?? message.is_read;
                const link = contactLink(message.contact);
                return (
                  <tr key={message.id} className="hover:bg-stone-50">
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold',
                          isRead
                            ? 'bg-stone-100 text-stone-600'
                            : 'bg-amber-100 text-amber-800',
                        )}
                      >
                        {isRead ? 'Sudah Dibaca' : 'Belum Dibaca'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-stone-600">
                      {formatDateIndonesia(message.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-stone-900">{message.name}</p>
                      <p className="text-xs text-stone-500">{message.contact}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-stone-800">
                        {message.subject || 'Tanpa Subjek'}
                      </p>
                      <p className="line-clamp-1 max-w-[280px] text-xs text-stone-500">
                        {message.message}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openMessage(message)}
                          aria-label="Baca detail pesan"
                          className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 hover:text-primary focus-ring"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleRead(message)}
                          aria-label={isRead ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'}
                          className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 hover:text-primary focus-ring"
                        >
                          {isRead ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                        </button>
                        <a
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                          aria-label="Hubungi pengirim"
                          className="rounded-lg p-2 text-stone-500 hover:bg-green-50 hover:text-green-600 focus-ring"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(message)}
                          aria-label="Hapus pesan"
                          className="rounded-lg p-2 text-stone-500 hover:bg-red-50 hover:text-red-600 focus-ring"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={active !== null}
        onClose={() => setActive(null)}
        title="Detail Pesan"
      >
        {active && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-stone-900">{active.name}</p>
                <p className="text-sm text-stone-500">{active.contact}</p>
              </div>
              <p className="text-xs text-stone-400">
                {formatDateIndonesia(active.created_at)}
              </p>
            </div>
            <div className="rounded-xl bg-stone-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                {active.subject || 'Tanpa Subjek'}
              </p>
              <p className="mt-1 whitespace-pre-line text-sm text-stone-700">
                {active.message}
              </p>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        title="Konfirmasi Hapus Pesan"
      >
        <p className="flex items-center gap-2 text-sm text-stone-600">
          <AlertCircle className="h-4 w-4 text-red-500" />
          Yakin ingin menghapus pesan dari <strong>{deleteTarget?.name}</strong>?
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setDeleteTarget(null)}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleDelete} isLoading={isPending}>
            Hapus
          </Button>
        </div>
      </Modal>
    </div>
  );
}
