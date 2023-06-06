# Description

[Swagger](http://localhost:5001/api/docs#/) if started local

## Installation

1.  `npm install` || `yarn`
1.  fill `.env.development` for dev or `.env.production` for prod by `env.example`


.env.development:
```
# URL
HOST_URL=localhost
PORT=5001

# DB
POSTGRES_HOST=rogue.db.elephantsql.com
POSTGRES_USER=orssobts
POSTGRES_DB=orssobts
POSTGRES_PASSWORD=cFvUIucl1aCPPRJv1Mj_Sch1L9QRphru
POSTGRES_PORT=5432

# JWT
JWT_PRIVATE_KEY=secret-key

# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=iteam.comp.org@gmail.com
SMTP_PASSWORD=fqrpshvbumbqdyok
```

## Running the app:

### `NPM`

#### Production mode

Build and start automatically:

```sh
$ npm run start
```

Start if exist `dist` folder:

```sh
$ npm run start:prod
```

#### Development

Start dev server:

```sh
$ npm run start:dev
```

### `YARN`

#### Production mode

Build and start automatically:

```sh
$ yarn start
```

Start if exist `dist` folder:

```sh
$ yarn start:prod
```

#### Development

Start dev server:

```sh
$ yarn start:dev
```

## `Docker`

#### Development with `docker`

Start with `npm` and `docker`(`need` turn on `docker` app)

```sh
$ npm run start:dev-docker
```

Start with `yarn` and `docker`(`need` turn on `docker` app)

```sh
$ yarn start:dev-docker
```

#### Run dev with `docker-compose`

```sh
$ docker-compose up
```

#### Build with `docker-compose`

```sh
$ docker-compose build
```

## Others

Formatting code using `npm`:

```sh
$ npm run format
```

Formatting code using `yarn`:

```sh
$ yarn format
```

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
