export const sectionSlugs = ['materials', 'faq', 'releases', 'software'] as const;

export type SectionSlug = (typeof sectionSlugs)[number];

export interface SectionConfig {
  slug: SectionSlug;
  /** Название в навигации и на странице. */
  label: string;
  /** Надзаголовок. */
  eyebrow: string;
  /** Вводный абзац под заголовком. */
  intro: string;
  /** Описание для meta и поисковиков. */
  description: string;
  /** Текст пустого состояния. */
  empty: string;
  /** Ссылка «назад» на странице записи. */
  backLabel: string;
  /** Заголовок навигации «новее / раньше». */
  otherLabel: string;
}

export const sections: Record<SectionSlug, SectionConfig> = {
  materials: {
    slug: 'materials',
    label: 'Материалы',
    eyebrow: 'База знаний',
    intro: 'Документация проекта, технические разборы, инструкции и видео.',
    description: 'Все материалы базы знаний FreeTUGA001: документация, разборы, инструкции и видео.',
    empty: 'Материалов пока нет. Первые появятся здесь.',
    backLabel: 'Все материалы',
    otherLabel: 'Другие материалы',
  },
  faq: {
    slug: 'faq',
    label: 'ЧАВО',
    eyebrow: 'Вопросы',
    intro: 'Короткие ответы на частые вопросы: установка, совместимость, обновления и откат.',
    description:
      'Частые вопросы по FreeTUGA001: установка, совместимость головных устройств, обновления и откат.',
    empty: 'Вопросов пока нет. Задайте первый в Telegram-сообществе.',
    backLabel: 'Все вопросы',
    otherLabel: 'Другие вопросы',
  },
  releases: {
    slug: 'releases',
    label: 'Релизы',
    eyebrow: 'Версии',
    intro: 'История версий ПО: что изменилось, с чем совместимо и как обновиться.',
    description:
      'Релизы ПО FreeTUGA001: изменения по версиям, совместимость и инструкции по установке.',
    empty: 'Релизов пока нет. Первый появится здесь.',
    backLabel: 'Все релизы',
    otherLabel: 'Другие релизы',
  },
  software: {
    slug: 'software',
    label: 'ПО',
    eyebrow: 'Программы',
    intro: 'Программное обеспечение проекта и инструменты, с помощью которых оно устанавливается.',
    description:
      'ПО FreeTUGA001 и инструменты установки: архивы проекта, Magic SQD и вспомогательные программы.',
    empty: 'Список ПО пока пуст.',
    backLabel: 'Всё ПО',
    otherLabel: 'Другое ПО',
  },
};

export const sectionList = sectionSlugs.map((slug) => sections[slug]);

export const getSection = (slug: string): SectionConfig =>
  sections[slug as SectionSlug] ?? sections.materials;

export const sectionHref = (slug: SectionSlug) => `/${slug}`;
