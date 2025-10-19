export default interface Book {
  bookId: string;
  title: string;
  genre?: string;
  author: string;
publishedYear?: number;
  coverURL?: string;
}
