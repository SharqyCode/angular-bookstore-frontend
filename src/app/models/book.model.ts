export default interface Book {
  id: string;
  title: string;
  description?: string;
  author: string;
  publishingYear?: number;
  coverURL?: string;
}
