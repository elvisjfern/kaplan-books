import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book-list/book-list.component';
import { CreateBookComponent } from './create-book/create-book.component';

@NgModule({
  declarations: [BooksComponent, BookComponent, BookListComponent, CreateBookComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
})
export class BooksModule {}
