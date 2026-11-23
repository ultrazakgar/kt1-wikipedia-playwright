# Тесты Playwright для Wikipedia

Репозиторий содержит автотесты на [Playwright](https://playwright.dev/) для существующего веб-сервиса — [Wikipedia.org](https://www.wikipedia.org/).

## Что проверяют тесты

Один сценарий, состоящий из трёх шагов:

1. **Проверка наличия текстов на странице.**
   Открывается главная страница Wikipedia и проверяется наличие заголовка
   `Wikipedia`, подзаголовка `The Free Encyclopedia` и текста
   `Read Wikipedia in your language`.

2. **Работа с интерактивными элементами и формой поиска.**
   В поле поиска вводится запрос `Playwright (software)`, форма отправляется
   нажатием `Enter`. Проверяется, что произошёл переход на страницу статьи,
   отображается заголовок `Playwright` и текст
   `From Wikipedia, the free encyclopedia`.

3. **Переход на другую страницу сайта.**
   На странице статьи происходит клик по ссылке `Microsoft`. Проверяется,
   что URL изменился на `/Microsoft` и отображается заголовок статьи
   `Microsoft`.

## Структура репозитория
```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml       # CI: запуск тестов на GitHub Actions
├── tests/
│   └── example.spec.js          # сам тест
├── playwright.config.js         # конфигурация Playwright
├── package.json                 # зависимости и скрипт запуска
├── tests-passed.png             # скриншот (если загружали файл)
└── README.md

## Запуск локально

```bash
npm install
npx playwright install
npx playwright test

✅ Результат прогона тестов
Тесты запускаются автоматически через GitHub Actions при каждом
push в репозиторий.

https://tests-passed.png/
```

<img width="1438" height="659" alt="image" src="https://github.com/user-attachments/assets/7b0a82f7-50be-453c-a4c5-59ddcc9f15ca" />
