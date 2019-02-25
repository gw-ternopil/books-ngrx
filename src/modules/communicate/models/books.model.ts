export class Book {
  constructor(
    public name: string,
    public author: string,
    public pageAmount: number,
    public genre: string,
    public isFaforite?: boolean = false,
    public id?: number,
  ) {
  }
}

export interface Books {
  books: Book[];
}
