import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {Book, Books} from '../../../communicate/models/books.model';
import {AppState} from '../../../communicate/redux/state/app.state';
import {MatDialog} from '@angular/material';
import {BookDialogComponent} from '../book-dialog/book-dialog.component';


@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {
  public booksState: Observable<Books>;
  public book: Book;

  constructor(private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private  store: Store<AppState>) {
  }

  ngOnInit() {
    this.booksState = this.store.select('booksPage');
    this.getBookById();
  }

  public getBookById() {
    const observable = combineLatest(this.activatedRoute.params, this.booksState).subscribe(([route, state]) => {
      const ID = Number(route.id);
      this.book = state.books.find((book: Book) => book.id === ID);
    });
  }

  public editBook() {
    this.dialog.open(BookDialogComponent, {
      width: '350px',
      data: {
        book: this.book
      }
    });
  }
}
