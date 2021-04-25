import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Book } from '../book.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Array<Book> = [];
  filteredBooks: Array<Book> = [];

  constructor(private bookService: BooksService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.bookService.fetchBooks().subscribe(
      (books: Array<Book>) => {
        this.filteredBooks = this.books = books;
      },
      (error: Error) => console.error(error)
    );
  }

  handleSearchChange(event) {
    const searchString = (event?.target?.value ?? '').trim();
    if (searchString) {
      this.filteredBooks = this.books.filter(({ title }) =>
        new RegExp(`${searchString}`, 'i').test(title)
      );
    } else {
      this.filteredBooks = this.books;
    }
  }

  handleBookCreate() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
