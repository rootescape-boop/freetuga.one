# FreeTUGA001

Личный блог с админкой: статьи, видео с YouTube и Rutube, светлая минималистичная тема.
Статический сайт на Astro, контент — markdown-файлы в этом же репозитории, публикация — через
GitHub Pages.

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
│   ├── posts/            # статьи (.mdx)
│   └── pages/about.mdx   # страница «О сайте»
├── data/site.json        # название, описание, контакты (редактируется в админке)
├── components/           # Header, Footer, карточки, видео, иконки
├── layouts/BaseLayout.astro
├── lib/                  # site, даты, чтение, теги, выборки
├── pages/                # маршруты: главная, статьи, теги, архив, поиск, RSS
├── styles/global.css     # дизайн-токены и типографика
└── content.config.ts     # схема контента (Zod)
public/
├── admin/                # Sveltia CMS: index.html + config.yml
├── uploads/              # картинки, загруженные из админки
├── CNAME                 # freetuga.one
└── favicon.svg
.github/workflows/deploy.yml
```

## Как написать статью

Создайте файл `src/content/posts/moy-slug.mdx`:

```yaml
---
title: Заголовок статьи
description: Одно-два предложения для карточки и поисковиков
date: 2026-10-30
cover: /uploads/cover.jpg
coverAlt: Что изображено на обложке
tags: [технологии, дизайн]
featured: false
draft: false
videos:
  - platform: youtube
    id: aqz-KE-bpKQ
    title: Подпись к ролику
---

Текст статьи в markdown.
```

Поля:

- `draft: true` — черновик, не попадает в продакшн-сборку;
- `featured: true` — большая карточка на главной;
- `tags` — теги, для них автоматически создаются страницы `/tags/<slug>`;
- `videos` — блоки видео над текстом (плеер грузится по клику).

## Видео

Три способа вставить ролик:

1. **Frontmatter `videos`** — основной способ, доступен в админке (платформа + ID).
2. **Ссылка в тексте** — если вставить в статью отдельным абзацем ссылку
   `https://youtu.be/ID` или `https://rutube.ru/video/ID/`, она автоматически превратится
   в обложку с кнопкой play.
3. **MDX-компонент** прямо в тексте статьи:

```mdx
<YouTube id="aqz-KE-bpKQ" title="Название" />
<Rutube id="9bff0c3b2a05d01263ce675902dbbf38" title="Название" />
<Video platform="youtube" id="aqz-KE-bpKQ" />
```

Плеер YouTube/Rutube подключается только после клика: до этого показывается постер.
Для Rutube постер берётся из API на этапе сборки, с градиентным фолбэком.

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

Токен хранится в `localStorage` браузера. Это нормально для личного блога с одним автором, но не
подходит для команды: тогда нужен OAuth-прокси и роли.

### Публикация

Сохранение в админке = коммит в `main` → GitHub Actions пересобирает сайт (обычно 1–2 минуты).
Черновики (`draft: true`) остаются в репозитории, но не публикуются.

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

- Название, описание, автор, почта, GitHub — `src/data/site.json` (или раздел **Настройки** в админке).
- Цвета, шрифты, отступы — переменные в начале `src/styles/global.css`.
- Меню — `src/lib/site.ts`.
- Домен — `public/CNAME`, `site` в `astro.config.mjs`, `robots.txt`, `admin/config.yml`.
- OG-картинка — `public/og.png` (1200×630).

## Полезно знать

- Сайт статический: серверных редиректов нет. Старые адреса можно перенаправить в
  `astro.config.mjs` через `redirects`.
- В тёмной теме используется тот же набор токенов — переключатель в шапке, выбор сохраняется.
- Pagefind индексирует только `<main>` (`data-pagefind-body`), админка исключена.
- RSS: `/rss.xml`, карта сайта: `/sitemap-index.xml`.
