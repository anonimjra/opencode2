export const MAX_FILE_SIZE = 2 * 1024 * 1024;
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Format file harus JPG, PNG, atau WebP.',
    };
  }
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'Ukuran file maksimal 2MB.',
    };
  }
  return { valid: true };
}
