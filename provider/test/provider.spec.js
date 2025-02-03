const { Verifier } = require('@pact-foundation/pact');
const app = require("../src/server.js");

const server = app.listen(3000)

describe("Pact Verification", () => {
    it("validates the expectations of LibraryConsumer", async () => {
        const opts = {
            provider: "LibraryProvider",
            providerBaseUrl: "http://localhost:3000",
            pactBrokerToken: process.env.PACT_BROKER_TOKEN,
            providerVersion: process.env.GITHUB_SHA,
            publishVerificationResult: true,
            providerVersion: "1.0.0",
            stateHandlers: {
                "A book with ID 1 exists": () => {
                    return Promise.resolve("Book with ID 1 exists")
                },
            },
        }

        const verifier = new Verifier(opts);

        return verifier
            .verifyProvider()
            .then(output => {
                console.log('Pact Verification Complete!');
                console.log('Result:', output);
            })
    })

    afterAll(() => {
        server.close()
    })
})
