# TravelPulse (Nuxt 3 / Vue 3)

Полная клиентская часть приложения TravelPulse по всем макетам Figma (`frame 1` — `frame 14`) и мобильным макетам (`под телефон/frame 1` — `frame 4`).

## Запуск

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:3000`.

## Что реализовано

- `components/AppHeader.vue` — шапка сайта (десктоп и мобильная 428px) с выпадающим переключением языка (`RUS`, `ENG`, `中国人`)
- `components/HeroSearch.vue` — форма поиска со всеми 6 интерактивными выпадающими меню (`Откуда`, `Куда`, `Туда`, `Обратно`, `Путешественники`, `Класс`) и отдельной мобильной формой поиска
- `components/AuthModal.vue` — все 3 модальных окна авторизации и регистрации (выбор способа входа, вход по email, регистрация) с адаптивом под мобильные экраны
- `components/PopularDestinations.vue` — популярные направления (4 круга на десктопе, слайдер по 2 на мобилке)
- `components/PopularTours.vue` — карточки популярных туров (3 колонки на десктопе, 2x2 на мобилке)
- `components/TripPlanning.vue` — планирование поездки с фильтрами и ссылками
- `components/AppFooter.vue` — подвал сайта (десктоп и мобильный вариант)
- `composables/useLang.ts` и `composables/useAuthModal.ts` — состояние языка и модалок
