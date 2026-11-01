# FreeTUGA001

Открытая база знаний по проекту FreeTUGA001 для головных устройств ECARX: документация, инструкции, ЧАВО, релизы и ПО. Статический сайт на Astro с контентом в markdown-файлах. Всё ПО — **Donationware**.

- **Сайт:** https://freetuga.one
- **Админка:** https://freetuga.one/admin

## Стек

| Что | Чем |
| --- | --- |
| Генератор | Astro (static) |
| Стили | Tailwind CSS 4 + CSS-переменные |
| Контент | MDX + content collections + Zod |
| Админка | Sveltia CMS (git-based) |
| Поиск | Pagefind |
| Хостинг | GitHub Pages + Actions |

## Локальный запуск

Нужен Node.js **22.23+** (рекомендуется 24 LTS).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # сборка в dist/ + индекс Pagefind
npm run preview    # просмотр собранного сайта
```

## Структура

```
src/
├── content/posts/         # записи всех разделов (.mdx)
├── content/pages/         # статические страницы
├── data/site.json         # название, описание, контакты
├── components/            # Header, Footer, карточки, иконки
├── layouts/               # BaseLayout
├── lib/                   # навигация, разделы, утилиты
├── pages/                 # маршруты
├── styles/global.css      # дизайн-токены
└── content.config.ts      # схема контента (Zod)
public/admin/              # Sveltia CMS (index.html + config.yml)
public/uploads/            # картинки из админки
public/CNAME               # freetuga.one
```

## Как добавить запись

Создайте `src/content/posts/moy-slug.mdx` (или через админку):

```yaml
---
title: Заголовок записи
section: materials        # materials | faq | releases | software
description: Краткое описание
date: 2026-10-30
cover: /uploads/cover.jpg
coverAlt: Описание обложки
tags: [проект, документация]
featured: false          # большая карточка на главной
draft: false             # true — черновик без публикации
videos: []               # платформа + ID (youtube, rutube, vk)
---
```

Адрес записи: `/<section>/<slug>`, например `/faq/kak-ustanovit-freetuga`.

## Админка

1. Откройте `/admin`.
2. **Sign in with Token** → создайте fine-grained token (GitHub → Settings → Developer settings → Fine-grained tokens) с доступом к репозиторию и правом **Contents: Read and write**.
3. Сохранение в админке = коммит в `main` → GitHub Actions пересобирает сайт.

## Деплой на GitHub Pages

1. Настройте **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push в `main` запускает workflow, который собирает сайт и публикует его.
3. Домен `freetuga.one` — в `public/CNAME`; настройте DNS на GitHub Pages и включите **Enforce HTTPS**.

## Настройка сайта

- Название, описание, контакты — `src/data/site.json` (или раздел **Настройки** в админке).
- Меню — `src/lib/site.ts`; разделы — `src/lib/sections.ts`.
- Цвета и шрифты — `src/styles/global.css`.
- Брендинг — `public/logo.jpg`, `favicon.png`, `apple-touch-icon.png`, OG — `public/og.png`.

## Donationware

Материалы и ПО доступны по модели **Donationware**. Связь: Telegram [@FreeTUGA001](https://t.me/FreeTUGA001).
