import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BooksHttpService} from '../../../communicate/services/books-http.service';
import {Book} from '../../../communicate/models/books.model';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss']
})
export class BookDialogComponent implements OnInit {
  public bookForm: FormGroup;
  private dialogTitle: string;
  private isEdit: boolean;
  public editBookId: number;

  constructor(public dialogRef: MatDialogRef<BookDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private bookService: BooksHttpService) {
  }

  ngOnInit() {
    this.dialogTitle = 'Create';
    this.isEdit = false;
    this.initBookForm();
    this.checkForEdit();
  }

  public submitDialog() {
    const bookData: Book = this.bookForm.value;
    this.isEdit ? this.bookService.updateBook(bookData, this.editBookId) : this.bookService.addBook(bookData);
    this.dialogRef.close();
  }

  private checkForEdit() {
    const book: Book = this.data.book;
    if (this.data && book) {
      this.isEdit = true;
      this.editBookId = book.id;
      this.setEditData(book);
      this.dialogTitle = 'Edit';
    }
  }

  private setEditData(book: {}) {
    this.bookForm.patchValue(book);
  }

  private initBookForm() {
    this.bookForm = new FormGroup({
      name: new FormControl('',
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]),
      author: new FormControl('',
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(35)]),
      genre: new FormControl('',
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)]),
      pageAmount: new FormControl('',
        [Validators.required,
          Validators.min(10),
          Validators.max(5000)]),
    });
  }
}
