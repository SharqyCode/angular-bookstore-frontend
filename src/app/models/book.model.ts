export default interface Book {
  bookId: string;
  title: string;
  genre?: string;
  author: Author;
  publishedYear?: number;
  coverURL?: string;
}

interface Author {
  name: string;
  bio: string;
  books: Book[];
}
