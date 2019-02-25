import {Component, OnInit} from '@angular/core';
import {Book, Books} from '../../../communicate/models/books.model';
import {AppState} from '../../../communicate/redux/state/app.state';
import {BooksHttpService} from '../../../communicate/services/books-http.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {BookDialogComponent} from '../book-dialog/book-dialog.component';
import {FormControl, FormGroup} from '@angular/forms';


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

  public onLoad() {
    this.bookService.loadBooks();
  }


  public addBook(): void {
    this.dialog.open(BookDialogComponent, {
      width: '350px'
    });
  }

  public setFavorite(id) {
    this.booksState.subscribe(array => {
      this.selectBook = array.books.find(book => book.id === id);
    });
    this.selectBook.isFaforite ? this.selectBook.isFaforite = false : this.selectBook.isFaforite = true;
    this.bookService.updateBook(this.selectBook, id);
  }

  public initSearchForm() {
    this.searchForm = new FormGroup({
      searchParams: new FormControl('')
    });
    // this.searchForm.controls['searchParams'].valueChanges.pipe(  // IMPLEMENT SORTING BY NAME
    //   debounceTime(300),
    //   distinctUntilChanged()).subscribe(word => {
    //     if (this.searchForm.controls['searchParams'].value) {
    //       this.bookService.searchBook(word);
    //     }
    //   }
    // );
  }

}
