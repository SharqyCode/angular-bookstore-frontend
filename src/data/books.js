// script.js
const fs = require('fs');

try {
  const rawData = fs.readFileSync('src/data/books.json');
  const myJsonData = JSON.parse(rawData);
  let newJSON = { books: [] }
  let books = myJsonData.books;
  books.map((book) => {
    book['id'] = book['bookId'];
    delete book['bookId'];
    newJSON.books.push(book)
  })

  newJSON = JSON.stringify(newJSON);
  fs.writeFileSync('src/data/books.json', newJSON)

} catch (error) {
  console.error('Error reading JSON file:', error);
}
