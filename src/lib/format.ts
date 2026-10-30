export const fullDate = (date: Date) =>
  new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

export const shortDate = (date: Date) =>
  new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);

export const monthYear = (date: Date) =>
  new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' }).format(date);

export const dayMonth = (date: Date) =>
  new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' }).format(date).replace('.', '');

export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

export const wordCount = (text?: string) =>
  (text ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

export const readingTime = (text?: string) => Math.max(1, Math.round(wordCount(text) / 170));

export const plural = (n: number, one: string, few: string, many: string) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
};
