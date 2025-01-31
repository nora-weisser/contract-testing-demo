# Contract Testing Demo - Library App

This project demonstrates contract testing using Pact.js with a simple library API provider and consumer client.

## Overview

Contract testing is a technique that helps ensure that services (such as an API provider and its consumers) can communicate with each other effectively. This project includes:

## Microservices under test

1. **Consumer**: The consumer is a service or application that uses the API provided by the provider. In our demo, it's represented by the `LibraryClient` in the `consumer` directory. The consumer defines its expectations of how the provider's API should behave.

2. **Provider**: The provider is the service that offers the API. In our demo, it's the Express.js server in the `provider` directory. The provider implements the API that the consumer uses and must meet the expectations set by the consumer.

## Technologies Used

- Node.js
- Express.js (for the provider API)
- Pact.js (for contract testing)
- Jest (for running tests)

## Setup

1. Ensure you have Node.js installed (version 14 or higher recommended).

2. Clone this repository:
   ```
   git clone git@github.com:nora-weisser/contract-testing-demo.git
   cd contract-testing-demo
   ```

3. Install dependencies for both provider and consumer:
   ```
   npm install
   ```

## Running Tests

- To run consumer tests: `npm run test:consumer`. If the test passes, a contract is generated and saved in the `pacts` folder. If it fails, the contract cannot be created.
- To run provider tests then: `npm run test:provider`
