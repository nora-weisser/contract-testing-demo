const path = require('path');
const { PactV3, MatchersV3 } = require('@pact-foundation/pact');
const LibraryClient = require('../src/client');


const provider = new PactV3({
    dir: path.resolve(process.cwd(), 'pacts'),
    consumer: "LibraryConsumer",
    provider: "LibraryProvider"
})

const EXPECTED_BOOK = { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "9780446310789" }

describe("getAllBooks", () => {
    test("returns all books", async () => {

        provider
            .uponReceiving("a request for all books")
            .withRequest({
                method: "GET",
                path: "/books",
            })
            .willRespondWith({
                status: 200,
                body: MatchersV3.eachLike(EXPECTED_BOOK),
            })

        await provider.executeTest(async (mockService) => {
            const client = new LibraryClient(mockService.url)
            const books = await client.getAllBooks()
            expect(books[0]).toEqual(EXPECTED_BOOK)
        })
    })
})

describe("getBook", () => {
    test("returns a book when a valid book id is provided", async () => {

        provider
            .given('A book with ID 1 exists')
            .uponReceiving("a request for book 1")
            .withRequest({
                method: "GET",
                path: "/books/1",
            })
            .willRespondWith({
                status: 200,
                body: MatchersV3.like(EXPECTED_BOOK),
            }),

        await provider.executeTest(async mockProvider => {
            const libraryClient = new LibraryClient(mockProvider.url)
            const book = await libraryClient.getBook(1);
            expect(book).toEqual(EXPECTED_BOOK);
        })
    })
})
