import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from '../communicate/services/auth-guard.service';
import {BooksListComponent} from './components/books-list/books-list.component';
import {BookItemComponent} from './components/book-item/book-item.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'books-list'
  },
  {
    path: 'books-list',
    component: BooksListComponent
  },
  {
    path: 'books-list/:id',
    component: BookItemComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {
}
