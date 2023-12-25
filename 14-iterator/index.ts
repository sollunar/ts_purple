const bookShelf: IBook[] = [
  {
    id: "1",
    date: "2023-01-01",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  },
  {
    id: "2",
    date: "2023-02-15",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
  },
  {
    id: "3",
    date: "2023-03-30",
    title: "1984",
    author: "George Orwell",
  },
  {
    id: "4",
    date: "2023-04-20",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
  },
];

interface IBook {
  id: string;
  date: string;
  title: string;
  author: string;
}

interface IBookshelf {
  books: IBook[];
  sortById(): void;
  sortByDate(): void;
  size(): number;
}

class BookShelf implements IBookshelf {
  public books: IBook[] = [];

  constructor(booksArr: IBook[]) {
    this.books = booksArr;
  }

  private sort(sortValue: keyof IBook): void {
    this.books = this.books.sort((a, b) => {
      if (a[sortValue] < b[sortValue]) return -1;
      else if (a[sortValue] === b[sortValue]) return 0;
      else return 1;
    });
  }

  sortById(): void {
    return this.sort("id");
  }
  sortByDate(): void {
    return this.sort("date");
  }

  size(): number {
    return this.books.length;
  }

  getBook(index: number): IBook {
    return this.books[index];
  }
}

interface IIterator<T> {
  next(): T | undefined;
  previous(): T | undefined;
  current(): T | undefined;
  index(): number;
}

class BookshelfIterator implements IIterator<IBook> {
  private position: number = 0;
  constructor(public bookshelf: BookShelf) {
    this.bookshelf = bookshelf;
  }

  next(): IBook | undefined {
    this.position += 1;

    if (this.position === this.bookshelf.size()) {
      this.position = 0;
    }

    return this.bookshelf.getBook(this.position);
  }
  previous(): IBook | undefined {
    this.position -= 1;

    if (this.position < 0) {
      this.position = this.bookshelf.size() - 1;
    }

    return this.bookshelf.getBook(this.position);
  }
  current(): IBook | undefined {
    return this.bookshelf.getBook(this.position);
  }
  index(): number {
    return this.position;
  }
}

class BookshelfByIdIterator extends BookshelfIterator {
  constructor(bookshelf: BookShelf) {
    super(bookshelf);
    this.bookshelf.sortById();
  }
}

class BookshelfByDateIterator extends BookshelfIterator {
  constructor(bookshelf: BookShelf) {
    super(bookshelf);
    this.bookshelf.sortByDate();
  }
}

const iteratorById = new BookshelfByIdIterator(new BookShelf(bookShelf));
console.log(iteratorById.current());
console.log(iteratorById.next());
console.log(iteratorById.previous());
console.log(iteratorById.next());
console.log(iteratorById.index());

const iteratorByDate = new BookshelfByDateIterator(new BookShelf(bookShelf));

console.log(iteratorByDate.current());
console.log(iteratorByDate.next());
console.log(iteratorByDate.previous());
console.log(iteratorByDate.next());
console.log(iteratorByDate.index());

// console.log(iteratorById.previous());
// console.log(iteratorById.previous());
// console.log(iteratorById.previous());
// console.log(iteratorById.previous());
// console.log(iteratorById.previous());
// console.log(iteratorById.previous());
// console.log(iteratorById.previous());
// console.log(iteratorById.previous());
