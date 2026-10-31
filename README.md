# FreeTUGA001

Открытая база знаний по проекту FreeTUGA001 для головных устройств ECARX: документация,
инструкции, ЧАВО, релизы и ПО, видео с YouTube, Rutube и VK Видео, светлая минималистичная тема.
Статический сайт на Astro, контент — markdown-файлы в этом же репозитории, публикация — через
GitHub Pages. Всё ПО проекта распространяется по модели **Donationware**.

- **Сайт:** https://freetuga.one
- **Админка:** https://freetuga.one/admin
- **Резервный адрес:** https://rootescape-boop.github.io/freetuga.one/

## Стек

| Что | Чем |
| --- | --- |
| Генератор | [Astro](https://astro.build) 7 (static) |
| Стили | Tailwind CSS 4 + CSS-переменные дизайн-токенов |
| Контент | MDX + content collections + Zod |
| Админка | [Sveltia CMS](https://sveltiacms.app) (git-based, вход по токену GitHub) |
| Поиск | [Pagefind](https://pagefind.app) (индексируется при сборке) |
| Шрифты | Inter + Literata (self-hosted, `@fontsource-variable`) |
| Хостинг | GitHub Pages + GitHub Actions |

## Локальный запуск

Нужен Node.js **22.23+** (рекомендуется 24 LTS).

```bash
npm install
npm run dev        # http://localhost:4321
```

| Команда | Что делает |
| --- | --- |
| `npm run dev` | Дев-сервер с горячей перезагрузкой |
| `npm run build` | Сборка в `dist/` + индекс поиска Pagefind |
| `npm run preview` | Просмотр собранного сайта |

> Поиск работает только после `build` + `preview`: в dev-режиме Pagefind ещё не проиндексирован.

## Структура

```
src/
├── content/
│   ├── posts/            # записи всех разделов (.mdx)
│   └── pages/about.mdx   # страница «О проекте»
├── data/site.json        # название, описание, Telegram (редактируется в админке)
├── components/           # Header, Footer, карточки, видео, иконки, SectionIndex, EntryView
├── layouts/BaseLayout.astro
├── lib/                  # site, sections, даты, чтение, теги, выборки
├── pages/                # маршруты: главная, materials, faq, releases, software, теги, архив, поиск
├── styles/global.css     # дизайн-токены и типографика
└── content.config.ts     # схема контента (Zod)
public/
├── admin/                # Sveltia CMS: index.html + config.yml
├── uploads/              # картинки, загруженные из админки
├── CNAME                 # freetuga.one
├── logo.jpg              # логотип в шапке и подвале
├── favicon.png
└── apple-touch-icon.png
.github/workflows/deploy.yml
```

## Как добавить запись

Создайте файл `src/content/posts/moy-slug.mdx`:

```yaml
---
title: Заголовок записи
section: materials        # materials | faq | releases | software
description: Одно-два предложения для карточки и поисковиков
date: 2026-10-30
cover: /uploads/cover.jpg
coverAlt: Что изображено на обложке
tags: [проект, документация]
featured: false
draft: false
videos:
  - platform: youtube
    id: aqz-KE-bpKQ
    title: Подпись к ролику
  - platform: vk
    id: -12345678_456239017
    title: Ролик в VK Видео
    poster: /uploads/vk-cover.jpg   # необязательно
---

Текст записи в markdown.
```

Поля:

- `section` — раздел сайта: `materials` (Материалы), `faq` (ЧАВО), `releases` (Релизы) или
  `software` (ПО). По умолчанию `materials`;
- `draft: true` — черновик, не попадает в продакшн-сборку;
- `featured: true` — большая карточка на главной;
- `tags` — теги, для них автоматически создаются страницы `/tags/<slug>`;
- `videos` — блоки видео над текстом (плеер грузится по клику);
- `poster` внутри видео — необязательная ручная обложка (особенно полезно для VK).

Публичный адрес записи: `/<section>/<slug>`, например `/faq/kak-ustanovit-freetuga`.
Раздел «Материалы» дополнительно умеет фильтровать записи по наличию видео.

## Видео

Поддерживаются YouTube, Rutube и VK Видео. Три способа вставить ролик:

1. **Frontmatter `videos`** — основной способ, доступен в админке (платформа + ID).
2. **Ссылка в тексте** — если вставить в материал отдельным абзацем ссылку
   `https://youtu.be/ID`, `https://rutube.ru/video/ID/` или
   `https://vk.com/video-12345678_456239017`, она автоматически превратится
   в обложку с кнопкой play.
3. **MDX-компонент** прямо в тексте материала:

```mdx
<YouTube id="aqz-KE-bpKQ" title="Название" />
<Rutube id="9bff0c3b2a05d01263ce675902dbbf38" title="Название" />
<Vk id="-12345678_456239017" title="Название" poster="/uploads/vk-cover.jpg" />
<Video platform="vk" id="-12345678_456239017" />
```

Плеер подключается только после клика: до этого показывается постер. Для Rutube
постер берётся из API на этапе сборки, для VK — через oEmbed. Если запрос не удался,
показывается градиентный фолбэк; для VK обложку можно задать вручную полем `poster`.

## Админка

Админка — статическая страница `/admin`, которая работает с GitHub API напрямую.

### Вход

1. Откройте https://freetuga.one/admin (или `http://localhost:4321/admin/`).
2. Нажмите **Sign in with Token**.
3. Создайте fine-grained token: GitHub → Settings → Developer settings →
   **Fine-grained tokens** → Generate new token.
   - Repository access: **Only select repositories** → `rootescape-boop/freetuga.one`
   - Permissions → Repository permissions → **Contents: Read and write**
   - Срок действия — например, 90 дней.
4. Вставьте токен в диалог входа.

Токен хранится в `localStorage` браузера. Это нормально для личного проекта, но не подходит для
команды: тогда нужен OAuth-прокси и роли.

### Публикация

Сохранение в админке = коммит в `main` → GitHub Actions пересобирает сайт (обычно 1–2 минуты).
Черновики (`draft: true`) остаются в репозитории, но не публикуются. Поле **Раздел** определяет,
в какой раздел сайта попадёт запись и по какому адресу она будет опубликована.

## Деплой на GitHub Pages

1. Создайте **публичный** репозиторий `rootescape-boop/freetuga.one`.
2. Отправьте код:

   ```bash
   git remote add origin git@github.com:rootescape-boop/freetuga.one.git
   git push -u origin main
   ```

3. В репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Вкладка **Actions** → запустится workflow «Deploy site to GitHub Pages». После первого
   успешного деплоя сайт будет доступен на `https://rootescape-boop.github.io/freetuga.one/`.

### Свой домен `freetuga.one`

Файл `public/CNAME` уже содержит домен. Осталось направить DNS.

Домен делегирован на Vercel DNS (`ns1/ns2.vercel-dns.com`), поэтому записи добавляются в панели
Vercel → Domains → `freetuga.one` → DNS Records:

| Тип | Имя | Значение |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `rootescape-boop.github.io` |

Затем в **Settings → Pages → Custom domain** укажите `freetuga.one`, дождитесь проверки DNS и
включите **Enforce HTTPS** (сертификат выпускается автоматически).

Если домен остался привязан к старому проекту Vercel — удалите его оттуда, иначе Vercel может
перехватывать трафик.

## Настройка сайта

- Название, описание и Telegram — `src/data/site.json` (или раздел **Настройки** в админке).
- Цвета, шрифты, отступы — переменные в начале `src/styles/global.css`.
- Меню — `src/lib/site.ts`.
- Разделы и их подписи — `src/lib/sections.ts`.
- Брендинг — `public/logo.jpg` (48×48 в шапке, 40×40 в подвале), `favicon.png`,
  `apple-touch-icon.png`.
- Домен — `public/CNAME`, `site` в `astro.config.mjs`, `robots.txt`, `admin/config.yml`.
- OG-картинка — `public/og.png` (1200×630).

## Donationware

Материалы и ПО проекта доступны по модели **Donationware**: читать, сохранять и делиться ссылками
можно свободно, донаты остаются добровольной поддержкой проекта, а не условием доступа. Условия
также описаны в [LICENSE](./LICENSE) и на странице `/about`.

Связь: Telegram [@FreeTUGA001](https://t.me/FreeTUGA001).

## Полезно знать

- Сайт статический: серверных редиректов нет. Старые адреса можно перенаправить в
  `astro.config.mjs` через `redirects`.
- В тёмной теме используется тот же набор токенов — переключатель в шапке, выбор сохраняется.
- Pagefind индексирует только `<main>` (`data-pagefind-body`), админка исключена.
- Карта сайта: `/sitemap-index.xml`.
