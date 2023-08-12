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

### Concrete database:

In order to focus on testing and domain logic, I chose to implement an In-Memory database.
Since the domain in protected by repositories ports(interfaces), implementing any other concrete repository, such as mysql or postgres, will be safe.

### Testing:

The app has unit tests for domain/entities and domain/services and integrated tests, in presentation/controllers
Tests are in the same level as the tested file in order to facilitate visualization.

Example:

```
├── cart.entity.test.ts
├── cart.entity.ts
```
