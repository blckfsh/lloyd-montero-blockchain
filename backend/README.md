## Description

Simple server application that would allow to fetch data from the blockchain.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# start Redis first (required)
$ docker run --name redis -p 6379:6379 -d redis:7-alpine

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## API usage

The Ethereum endpoint is available at:

```
http://localhost:3000/api/v1/ethereum
```

Example request body:

```json
{
  "address": "0x1BA8f5D548Bf698d5b33d0BD5628C2EB76253264"
}
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License
Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
