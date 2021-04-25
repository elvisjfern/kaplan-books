import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book } from './book.interface';
import { BooksResponse } from './books.response.dto';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private httpClient: HttpClient) {}

  fetchBooks(): Observable<Array<Book>> {
    return this.httpClient
      .get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: 'kaplan test prep',
        },
      })
      .pipe(
        map((response: BooksResponse) => {
          const { items = [] } = response;
          return items.map((item) => {
            const {
              volumeInfo: {
                title = '',
                authors = [],
                publishedDate = '',
                publisher,
              } = {},
            } = item;

            return {
              title,
              authors,
              publishedDate,
              publisher,
            };
          });
        })
      );
  }
}
