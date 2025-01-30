const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

const books = [
    { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "9780446310789" },
    { id: 2, title: "1984", author: "George Orwell", isbn: "9780451524935" },
];

app.get("/books", (req, res) => res.json(books));

app.get("/books/:id", (req, res) => {
    const bookId = Number.parseInt(req.params.id);
    const book = books.find((b) => b.id === bookId);
    book ? res.json(book) : res.status(404).json({ error: "Book not found" });
});

app.post("/books", (req, res) => {
    const { title, author, isbn } = req.body;
    if (!title || !author || !isbn) {
        return res.status(400).json({ error: "Title, author, and ISBN are required" });
    }
    const newBook = { id: books.length + 1, title, author, isbn };
    books.push(newBook);
    res.status(201).json(newBook);
});

module.exports = app;
