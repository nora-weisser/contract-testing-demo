# Contract Testing Demo – Library App

Consumer-driven contract testing with [Pact](https://docs.pact.io/), from a local test run all the way to a `can-i-deploy` gate in CI.

Two small services share a contract: a **consumer** (`LibraryClient`) that reads books from an API, and a **provider** (an Express.js API) that serves them. The consumer writes down what it expects; the provider proves it delivers exactly that. A breaking change on either side fails the build before it reaches an environment where both run together.

## How it works

```
consumer test ──► pact file ──► Pact Broker ──► provider verification ──► can-i-deploy
 (expectations)   (pacts/)      (PactFlow)       (real provider API)       (release gate)
```

1. **Consumer test** (`consumer/test/consumer.test.js`) runs `LibraryClient` against a Pact mock server and records the interactions it relies on:
   - `GET /books` — a request for all books
   - `GET /books/1` — a request for one book
2. **Pact file** — if the consumer test passes, the contract is written to `pacts/LibraryConsumer-LibraryProvider.json`.
3. **Publish** — in CI, the contract is published to a Pact Broker (PactFlow), tagged with the commit SHA and branch.
4. **Provider verification** (`provider/test/provider.spec.js`) replays every interaction against the real Express API and checks the responses match.
5. **can-i-deploy** — the broker confirms each side is compatible with the version of the other before it's released.

## Project structure

```
consumer/
  src/client.js            LibraryClient: getBook, getAllBooks, addBook
  test/consumer.test.js    consumer expectations → pact file
provider/
  src/server.js            Express API: GET /books, GET /books/:id, POST /books
  test/provider.spec.js    verifies the provider against the pact
pacts/                     generated contracts
.github/workflows/         CI pipeline: test, publish, verify, can-i-deploy
```

## Run it locally

Requires Node.js 18+.

```bash
git clone https://github.com/nora-weisser/contract-testing-demo.git
cd contract-testing-demo
npm install

npm run test:consumer   # writes the contract to pacts/
npm run test:provider   # verifies the provider against it
```

## CI pipeline

[`.github/workflows/contract-test-sample.yml`](.github/workflows/contract-test-sample.yml) runs on every push:

| Step | Command |
| --- | --- |
| Consumer contract tests | `npm run test:consumer` |
| Publish contract to the broker | `npm run publish:pact` |
| Provider verification | `npm run test:provider` |
| Release gate for each side | `npm run can:i:deploy:consumer`, `npm run can:i:deploy:provider` |

To run it in your own fork, add two repository secrets: `PACT_BROKER_BASE_URL` and `PACT_BROKER_TOKEN` (a free [PactFlow](https://pactflow.io/) account works).

## Tech stack

Node.js · Express.js · Pact JS · Jest · Pact Broker (PactFlow) · GitHub Actions

## Read more

- [Consumer-Driven Contract Testing in Practice](https://noraweisser.com/2025/01/31/consumer-driven-contract-testing-in-practice/) — the walkthrough behind this repo
- [Automating Contract Testing in a CI/CD Pipeline with GitHub Actions](https://noraweisser.com/2025/02/04/automating-contract-testing-in-a-ci-cd-pipeline-with-github-actions/) — the pipeline, step by step
- [awesome-contract-testing](https://github.com/nora-weisser/awesome-contract-testing) — curated resources on contract testing
