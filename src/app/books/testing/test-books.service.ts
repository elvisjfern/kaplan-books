import { Injectable } from '@angular/core';
import { Observable, defer } from 'rxjs';
import { testBooks } from './test-books';
import { Book } from '../book.interface';

@Injectable()
export class TestBooksService {
  constructor() {}

  fetchBooks(): Observable<Array<Book>> {
    return defer(() => Promise.resolve(testBooks));
  }
}
