import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BookComponent } from './book.component';
import { testBooks } from '../testing/test-books';


describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let bookDe: DebugElement;
  const testBook = testBooks[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    bookDe = fixture.debugElement.query(By.css('.book-card'));
    component.book = testBook;
    fixture.detectChanges();
  });


  it('should display title', () => {
    const titleDe = bookDe.query(By.css('.title'))
    expect(titleDe.nativeElement.textContent).toContain(testBook.title);
  });

  it('should display book description', () => {
    const descDe = bookDe.query(By.css('.book-desc'))
    expect(descDe.children.length).toBe(3);
    const author = descDe.children[0];
    expect(author.nativeElement.textContent).toContain(testBook.authors.join(', '));
    const publisher = descDe.children[1];
    expect(publisher.nativeElement.textContent).toContain(testBook.publisher);
    const publishedDate = descDe.children[2];
    expect(publishedDate.nativeElement.textContent).toContain(testBook.publishedDate);
    // const author = descDe[0]
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
