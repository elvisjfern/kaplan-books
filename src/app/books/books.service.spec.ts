import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { BooksService } from './books.service';
import { testBooks, testBooksResponse } from './testing/test-books';

describe('BooksService', () => {
  let service: BooksService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BooksService],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BooksService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getBooks', () => {
    const params = new HttpParams({
      fromObject: {
        q: 'kaplan test prep',
      },
    });

    it('should call URL once with correct params', () => {
      service.fetchBooks().subscribe();

      const req = httpTestingController.expectOne((req) => {
        return req.url === service.booksFetchURL;
      });
      expect(req.request.method).toEqual('GET');
      expect(req.request.params).toEqual(params);
      req.flush([]);
    });

    it('should return testBooks', () => {
      service
        .fetchBooks()
        .subscribe(
          (books) => expect(books).toEqual(testBooks, 'should return testBooks'),
          fail
        );

      const req = httpTestingController.expectOne((req) => req.url === service.booksFetchURL);
      req.flush(testBooksResponse);
    });

    it('should turn 500 error', () => {
      const msg = '500 Failed';
      service.fetchBooks().subscribe(
        (heroes) => fail('expected to fail'),
        (error) => {
          expect(error.message).toContain(msg)
        }
      );

      const req = httpTestingController.expectOne((req) => req.url === service.booksFetchURL);
      req.flush(msg, { status: 500, statusText: 'Failed' });
    });
  });
});
