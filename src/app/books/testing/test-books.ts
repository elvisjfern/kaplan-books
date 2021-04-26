import { Book } from '../book.interface';

export const testBooks: Array<Book> = [
  {
    title: 'title1',
    authors: ['author1'],
    publisher: 'publisher1',
    publishedDate: '01/05/2021',
  },
  {
    title: 'title2',
    authors: ['author2'],
    publisher: 'publisher2',
    publishedDate: '02/05/2021',
  },
];

export const testBooksResponse: { items: Array<any> } = {
  items: [
    {
      volumeInfo: {
        title: 'title1',
        authors: ['author1'],
        publisher: 'publisher1',
        publishedDate: '01/05/2021',
      },
    },
    {
      volumeInfo: {
        title: 'title2',
        authors: ['author2'],
        publisher: 'publisher2',
        publishedDate: '02/05/2021',
      },
    },
  ],
};

export function getFilteredBooks(filterString: string): Array<Book> {
  return testBooks.filter(({ title }) =>
    new RegExp(`${filterString}`, 'i').test(title)
  );
}
