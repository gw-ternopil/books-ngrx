import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Store} from '@ngrx/store';
import {BooksHttpService} from '../../../communicate/services/books-http.service';
import {Book, Books} from '../../../communicate/models/books.model';
import {AppState} from '../../../communicate/redux/state/app.state';
import {Observable} from 'rxjs';
import {BookDialogComponent} from '../book-dialog/book-dialog.component';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  public booksState: Observable<Books>;
  public searchForm: FormGroup;
  public isFaforite: boolean;
  public selectBook: Book;

  constructor(private  store: Store<AppState>,
              public dialog: MatDialog,
              private bookService: BooksHttpService) {
  }

  ngOnInit() {
    this.isFaforite = false;
    this.booksState = this.store.select('booksPage');
    this.onLoad();
    this.initSearchForm();
  }

  public onLoad(): void {
    this.bookService.loadBooks();
  }


  public addBook(): void {
    this.dialog.open(BookDialogComponent, {
      width: '350px'
    });
  }

  public setFavorite(id: number): void {
    this.booksState.subscribe((array: Books) => {
      this.selectBook = array.books.find((book: Book) => book.id === id);
    });
    this.selectBook.isFaforite ? this.selectBook.isFaforite = false : this.selectBook.isFaforite = true;
    this.bookService.updateBook(this.selectBook, id);
  }

  public initSearchForm(): void {
    this.searchForm = new FormGroup({
      searchParams: new FormControl('')
    });

    // Search by name
    //
    // this.searchForm.controls['searchParams'].valueChanges.pipe(debounceTime(300), distinctUntilChanged())
    //   .subscribe((key: string) => {
    //     this.booksState.subscribe((array: Books) => {
    //       const searchItems: Book[] = array.books.filter((item: Book) => item.name.includes(key));
    //       console.log(searchItems);
    //     });
    //   });
  }
}
