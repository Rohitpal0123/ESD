const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

// Array to store book details
const books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho", price: 10.99 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 12.99 },
  { id: 3, title: "1984", author: "George Orwell", price: 8.99 }
];

// GET method to retrieve all books
app.get("/books", (req, res) => {
  res.json(books);
});

// GET method to retrieve a specific book
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).send("Book not found");
  }
  res.json(book);
});

// POST method to add a new book
app.post("/books", (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.json(newBook);
});

// PUT method to update a book's details
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).send("Book not found");
  }
  book.title = req.body.title;
  book.author = req.body.author;
  book.price = req.body.price;
  res.json(book);
});

// DELETE method to remove a book
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) {
    return res.status(404).send("Book not found");
  }
  books.splice(index, 1);
  res.sendStatus(204);
});

// Start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
