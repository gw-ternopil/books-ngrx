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

  public loadBooks() {
    this.get<Books[]>(this.concatUrl(''))
      .toPromise().then(
      (books: Books[]) => {
        this.store.dispatch(new LoadBooks(books));
      });
  }

  public addBook(book: Book) {
    this.post(this.concatUrl(''), book).subscribe((item: Book) => {
      this.store.dispatch(new AddBook(item));
    });
  }

  public updateBook(book: Book, id: number) {
    this.put(this.concatUrl(`/${id}`), book).subscribe((item: Book) => {
      this.store.dispatch(new UpdateBook(item));
    });
  }

  // public searchBook(word: string) {
  //   this.store.dispatch(new SearchBook(word));  // FOR IMPLEMENT SEARCH
  // }

}
