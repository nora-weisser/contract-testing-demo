class LibraryClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    async getBook(id) {
        const response = await fetch(`${this.baseUrl}/books/${id}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    }

    async getAllBooks() {
        const response = await fetch(`${this.baseUrl}/books`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    }

    async addBook(title, author, isbn) {
        const response = await fetch(`${this.baseUrl}/books`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, author, isbn }),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    }
}

module.exports = LibraryClient;
