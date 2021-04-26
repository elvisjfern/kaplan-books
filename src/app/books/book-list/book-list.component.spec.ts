import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { BookListComponent } from './book-list.component';
import { BooksService } from '../books.service';
import { TestBooksService } from '../testing/test-books.service';
import { testBooks, getFilteredBooks } from '../testing/test-books';

let component: BookListComponent;
let fixture: ComponentFixture<BookListComponent>;
let page: Page;

describe('BookListComponent', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  // const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', []);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent],
      // imports: [ MatIconModule ],
      providers: [
        { provide: BooksService, useClass: TestBooksService },
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(async () => {
    await createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display books equal to testBooks', () => {
    expect(page.bookList.length).toBe(testBooks.length);
  });

  it('should filter books based on search', () => {
    const hostElement = fixture.nativeElement;
    const searchIn: HTMLInputElement = hostElement.querySelector('input');
    const filteredBooks = getFilteredBooks('title1');
    searchIn.value = 'title1';
    searchIn.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    page.updateBooks();
    expect(page.bookList.length).toBe(filteredBooks.length);
  });

  it('should call Router navigate on Create new Book', fakeAsync( () => {
    const hostElement = fixture.nativeElement;
    const btnIn: HTMLButtonElement = hostElement.querySelector('#newBook');

    btnIn.dispatchEvent(new Event('click'));
    tick();
    expect(page.navSpy.calls.any()).toBe(true, 'navigate called');
    const navArgs = page.navSpy.calls.first().args;
    expect(navArgs[0]).toEqual(['create']);
    const activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    expect(navArgs[1]).toEqual({ relativeTo: activatedRoute });
  }));
});

class Page {
  bookList: HTMLDivElement[];
  book;

  /** Spy on router navigate method */
  navSpy: jasmine.Spy;

  constructor() {
    const bookNodes = fixture.nativeElement.querySelectorAll('.book-container');
    this.bookList = Array.from(bookNodes);

    // Get the component's injected router navigation spy
    const routerSpy = fixture.debugElement.injector.get(Router);
    this.navSpy = routerSpy.navigate as jasmine.Spy;
  }

  updateBooks() {
    const bookNodes = fixture.nativeElement.querySelectorAll('.book-container');
    this.bookList = Array.from(bookNodes);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(BookListComponent);
  component = fixture.componentInstance;

  // change detection triggers ngOnInit
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    // change detection updates the view
    fixture.detectChanges();
    page = new Page();
  });
}
