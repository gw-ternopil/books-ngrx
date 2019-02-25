import {Injectable} from '@angular/core';
import {HttpHandler} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AppState} from '../redux/state/app.state';
import {AddBook, LoadBooks, UpdateBook} from '../redux/actions/books.action';
import {BaseHttpService} from './base-http.service';
import {IHttpConfig} from '../models/http-config';
import {Book, Books} from '../models/books.model';

@Injectable({
  providedIn: 'root'
})
export class BooksHttpService extends BaseHttpService {
  protected _getBaseUrl(config: IHttpConfig): string {
    return config.books;
  }

  constructor(private store: Store<AppState>, handler: HttpHandler) {
    super(handler);
  }

  public loadBooks(): void {
    this.get<Books[]>(this.concatUrl(''))
      .toPromise().then(
      (books: Books[]) => {
        this.store.dispatch(new LoadBooks(books));
      });
  }

  public addBook(book: Book): void {
    this.post<Book>(this.concatUrl(''), book).subscribe((item: Book) => {
      this.store.dispatch(new AddBook(item));
    });
  }

  public updateBook(book: Book, id: number): void {
    this.put<Book>(this.concatUrl(`/${id}`), book).subscribe((item: Book) => {
      this.store.dispatch(new UpdateBook(item));
    });
  }
}
