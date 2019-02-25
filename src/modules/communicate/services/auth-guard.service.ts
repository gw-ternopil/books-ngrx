import {Injectable} from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../redux/state/app.state';
import {Observable} from 'rxjs';
import {Books} from '../models/books.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  public booksState: Observable<Books>;
  public books;


  constructor(private router: Router, private  store: Store<AppState>) {
  }

  canActivate(): boolean {
    this.booksState = this.store.select('booksPage');
    this.booksState.subscribe(res => {
      this.books = res.books;
    });
    if (this.books.length) {
      return true;
    }
    this.router.navigate(['/books-list']);
  }
}
