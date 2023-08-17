# Shopping Cart API

## Architecture

I opted for using hexagonal architecture to keep the application business logic decoupled from dependencies allowing easier testing and flexibility to change drivers through the ports-adapters mechanism.

```
├── config              // app general configs
├── core                // custom types, classes and interfaces, global configurations(logger)
│   ├── either.ts       // custom type for handling success or errors in functions responses
│   └── logger.ts
├── domain              // app domain containing all the application logic decoupled from dependencies
│   ├── entities        // app entities containing business entities, easy to test and to reuse across many services
│   ├── errors          // app errors
│   ├── ports           // repositories,services and logger interfaces
│   │   ├── logger
│   │   ├── mocks       // repositories mocks to use in tests
│   │   ├── repositories
│   │   └── services
│   └── services        // app services
├── infra
│   ├── database        // in-memory repository concrete implementations
│   └── logger          // concrete logger implementation
├── presentation
│   ├── controllers     // request handlers
│   ├── dtos            // request/response body interfaces
│   └── middlewares
├── types               // custom extension of Express type
├── container.ts        // dependency injection container
└── index.ts
```

### Diagram

![Alt text](docs/architecture.jpg)

### Concrete database:

In order to focus on testing and domain logic, I chose to implement an In-Memory database.
Since the domain in protected by repositories ports(interfaces), implementing any other concrete repository, such as mysql or postgres, will be safe.

### Testing:

The app has unit tests for domain/entities and domain/services and integrated tests, in presentation/controllers
Tests are in the same level as the tested file in order to facilitate visualization.

Observation: Using --runInBand flag to run tests sequentially in order to ensure integration tests results, since there is no mechanism to clean database between each test. To avoid that we could use sqlite and clean database before each integrated test.

Example:

```
├── cart.entity.test.ts
├── cart.entity.ts
```

## Preset Data

App starts with 3 items as stated in the challenge:

```
| itemId | name    | price |
| ------ | ------- | ----- |
| 1      | T-shirt | 12.99 |
| 2      | Jeans   | 25.00 |
| 3      | Dress   | 20.65 |
```

For the initial user, I simulated a token based authentication.
The token for the initial user can be set via USER_TOKEN variable in .env file.
The initial value set in .env.example is 1bd01725-7b40-4bae-89fb-6cdd36f66614

\*\*Business Rules Interpretation

Only 1 item of each kind is available for discount. So if the cart has 6 items of same type, the discount is gonna be the price of only one.

## Main features

- logging level
- request id for requests and logs
- request id for app logs(thanks to async local storage)
- simple graceful shutdown
- git hooks
  - commit linting
  - testing
  - linting

## Limitations

### Request Validations

- As the application is small it doesnt use any jsonschema or other object validator.

### Persistence and Isolation Level

- It does not support transactions and persistence, so it can't scale horizontally.

### Multi-user and Authentication

- It supports only one user and doesnt have a real token-based authentication mechanism.

### Logging

- It doesnt support child logging, but it could be done by updating the domain/ports/logger interface and its logging driver adapter

## Running commands

Run tests via docker:

```
make test
```

Run application in dev mode:

```
make run-dev
```

Run application in prod mode:

```
make run-prod
```

## Endpoints

### Get cart:

```
curl --location --request GET 'localhost:3000/api/v1/cart' \
--header 'Authorization: 1bd01725-7b40-4bae-89fb-6cdd36f66614'
```

Response Body:

```
{
    "items": [
        {
            "item": {
                "id": number,
                "name": "string",
                "price": number
            },
            "amount": number
        },
    ],
    "totalPrice": number,
    "discountPrice": number,
    "discount": number
}
```

### Add item to cart

```
curl --location 'localhost:3000/api/v1/cart' \
--header 'Authorization: 1bd01725-7b40-4bae-89fb-6cdd36f66614' \
--header 'Content-Type: application/json' \
--data '{
    "itemId":3,
    "amount":1
}'
```

### Remove item from cart

```
curl --location --request DELETE 'localhost:3000/api/v1/cart/item/3' \
--header 'Authorization: 1bd01725-7b40-4bae-89fb-6cdd36f66614'
```
