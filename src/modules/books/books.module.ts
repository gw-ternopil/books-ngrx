import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { BookItemComponent } from './components/book-item/book-item.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import {MaterialSharedModule} from '../material-shared/material-shared.module';
import { BookDialogComponent } from './components/book-dialog/book-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [BookItemComponent, BooksListComponent, BookDialogComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MaterialSharedModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],

})
export class BooksModule { }
