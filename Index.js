

const express = require("express");
const app = express();
const port = 3000;


app.use(express.json());


let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Harry Potter", author: "J.K. Rowling" }
];


app.get("/books", (req, res) => {
  res.json(books);
});


app.post("/books", (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.status(201).json(newBook);
});


app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;

  let index = books.findIndex(book => book.id === bookId);
  if (index !== -1) {
    books[index] = updatedBook;
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});


app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter(book => book.id !== bookId);
  res.json({ message: "Book deleted" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});