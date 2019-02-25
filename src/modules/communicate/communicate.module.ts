import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {BooksReducer} from './redux/reducers/books.reducer';
import {BooksModule} from '../books/books.module';
import {HttpClientModule} from '@angular/common/http';
import {MaterialSharedModule} from '../material-shared/material-shared.module';
import {BookDialogComponent} from '../books/components/book-dialog/book-dialog.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BooksModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({booksPage: BooksReducer}),
    MaterialSharedModule,
  ],
  entryComponents: [BookDialogComponent]
})
export class CommunicateModule { }
