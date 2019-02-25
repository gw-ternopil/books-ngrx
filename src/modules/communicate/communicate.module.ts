import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {BooksReducer} from './redux/reducers/books.reducer';
import {BooksModule} from '../books/books.module';
import {MaterialSharedModule} from '../material-shared/material-shared.module';
import {BookDialogComponent} from '../books/components/book-dialog/book-dialog.component';


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
export class CommunicateModule {
}
