var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var bookShelf = [
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
var BookShelf = /** @class */ (function () {
    function BookShelf(booksArr) {
        this.books = [];
        this.books = booksArr;
    }
    BookShelf.prototype.sortById = function () {
        this.books = this.books.sort(function (a, b) {
            if (a.id < b.id) {
                return -1;
            }
            else if (a.id == b.id) {
                return 0;
            }
            else {
                return 1;
            }
        });
    };
    BookShelf.prototype.sortByDate = function () {
        this.books = this.books.sort(function (a, b) {
            if (a.date < b.date) {
                return -1;
            }
            else if (a.date == b.date) {
                return 0;
            }
            else {
                return 1;
            }
        });
    };
    BookShelf.prototype.size = function () {
        return this.books.length;
    };
    BookShelf.prototype.getBook = function (index) {
        return this.books[index];
    };
    return BookShelf;
}());
var BookshelfIterator = /** @class */ (function () {
    function BookshelfIterator(bookshelf) {
        this.bookshelf = bookshelf;
        this.position = 0;
        this.bookshelf = bookshelf;
    }
    BookshelfIterator.prototype.next = function () {
        this.position += 1;
        if (this.position === this.bookshelf.size()) {
            this.position = 0;
        }
        return this.bookshelf.getBook(this.position);
    };
    BookshelfIterator.prototype.previous = function () {
        this.position -= 1;
        if (this.position < 0) {
            this.position = this.bookshelf.size() - 1;
        }
        return this.bookshelf.getBook(this.position);
    };
    BookshelfIterator.prototype.current = function () {
        return this.bookshelf.getBook(this.position);
    };
    BookshelfIterator.prototype.index = function () {
        return this.position;
    };
    return BookshelfIterator;
}());
var BookshelfByIdIterator = /** @class */ (function (_super) {
    __extends(BookshelfByIdIterator, _super);
    function BookshelfByIdIterator(bookshelf) {
        var _this = _super.call(this, bookshelf) || this;
        _this.bookshelf.sortById();
        return _this;
    }
    return BookshelfByIdIterator;
}(BookshelfIterator));
var BookshelfByDateIterator = /** @class */ (function (_super) {
    __extends(BookshelfByDateIterator, _super);
    function BookshelfByDateIterator(bookshelf) {
        var _this = _super.call(this, bookshelf) || this;
        _this.bookshelf.sortByDate();
        return _this;
    }
    return BookshelfByDateIterator;
}(BookshelfIterator));
var iteratorById = new BookshelfByIdIterator(new BookShelf(bookShelf));
console.log(iteratorById.current());
console.log(iteratorById.next());
console.log(iteratorById.previous());
console.log(iteratorById.next());
console.log(iteratorById.index());
var iteratorByDate = new BookshelfByDateIterator(new BookShelf(bookShelf));
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
