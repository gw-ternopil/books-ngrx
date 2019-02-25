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
    if (this.data && this.data.book) {
      this.setEditData(this.data.book);
    }
  }

  public submitDialog(): void {
    const bookData: Book = this.bookForm.value;
    if (this.data && this.data.book) {
      bookData.isFaforite = this.data.book.isFaforite;
    }
    this.isEdit ? this.bookService.updateBook(bookData, this.editBookId) : this.bookService.addBook(bookData);
    this.dialogRef.close();
  }

  private setEditData(book: Book): void {
    this.isEdit = true;
    this.dialogTitle = 'Edit';
    this.editBookId = book.id;
    this.bookForm.patchValue(book);
  }

  private initBookForm(): void {
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
