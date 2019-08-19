# Ceres

Проект для автоматизации работы диспетчерской службы в части планирования закупок и ведению учета имеющегося инвентаря.

Реализация серверной части проекта. Клиенткая часть находится по адресу [https://github.com/multiplayground/ceres-frontend](https://github.com/multiplayground/ceres-frontend)

**Проект является учебным.**

## Содержание
1. [Используемые технологии](#используемые-технологии)
2. [Инструменты](#инструменты)
3. [Как запустить](#как-запустить)
    1. [База данных](#база-данных)
    2. [Сервер](#сервер)

## Используемые технологии
  - Проект базируется на платформе [NodeJS](https://nodejs.org)
  - В качестве [фреймворка](https://ru.wikipedia.org/wiki/%D0%A4%D1%80%D0%B5%D0%B9%D0%BC%D0%B2%D0%BE%D1%80%D0%BA) используется [ExpressJS](https://expressjs.com/)
  - База данных
    - Сервер [MySQL 5.7](https://www.mysql.com/) / [MariaDB 10.0](https://mariadb.org/)
    - ORM
      - [ObjectionJS](https://vincit.github.io/objection.js/)
      - Для валидации моделей используется [validate.js](https://validatejs.org/)

## Инструменты
Для миграций и сидов используется [knex](http://knexjs.org/#Migrations-make).

Алиас для запуска knex - ```npm run knex```

Например, для создания миграции ```npm run knex migrate:make название_миграции```

## Как запустить
- ### База данных

  #### Возможные варианты

    - **Для Windows**
      - Установить сервер базы данных с оффициального сайта [MySQL 5.7](https://www.mysql.com/) / [MariaDB 10.0](https://mariadb.org/)
      - Установить [Open Server](https://ospanel.io/)
      - Использовать [Docker](https://www.docker.com/)
        - [Пример](#база-данных-в-docker) файла ```docker-compose.yml```
    - **Для MacOS**
      - Установить сервер базы данных с оффициального сайта [MySQL 5.7](https://www.mysql.com/) / [MariaDB 10.0](https://mariadb.org/)
      - Использовать [Mamp](https://www.mamp.info/en)
      - Использовать [Docker](https://www.docker.com/)
        - [Пример](#база-данных-в-docker) файла ```docker-compose.yml```
    - **Для Linux**
      - Сам знаешь что делать 😎

- ### Сервер
  - ```npm install```
  - ```npm run dev```

После это проект будет доступен по адресу [http://localhost:8080](http://localhost:8080)

## База данных в Docker
Пример файла ```docker-compose.yml```

```yaml
version: "3"

services:
  db:
    image: mysql:5.7
    container_name: ceres-backend-db-dev
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: ceres
      MYSQL_USER: ceres
      MYSQL_PASSWORD: secret
      TZ: Europe/Moscow
    ports:
      - "3306:3306"
    command: [
      'mysqld',
      '--character-set-server=utf8mb4',
      '--collation-server=utf8mb4_general_ci'
    ]

  adminer:
    image: adminer:4
    container_name: ceres-backend-db-adminer
    ports:
      - "8088:8080"
    depends_on:
      - db
```

В примере используется [adminer](https://www.adminer.org/) для удобного управления базой данных.

Adminer будет доступен по адресу [http://localhost:8088](http://localhost:8088)

Также к базе данных можно подключиться через стороние программы через порт ```3306```
