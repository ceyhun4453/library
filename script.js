let myLibrary = [];
const topContainer = document.querySelector("div.top-level-container");
const bookCardContainer = topContainer.querySelector("div.book-card-container");
const addButton = topContainer.querySelector("input#add-button");
const inputTitle = topContainer.querySelector("input#title");
const inputAuthor = topContainer.querySelector("input#author");
const inputPageNumber = topContainer.querySelector("input#page-number");
const inputHasRead = topContainer.querySelector("input#has-read");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}.`);
    };
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

//TODO: Find a better way to add so many elements.
//
/**@param {Book} book */
function addBookCard(book) {
    const bookTitleClass = "book-title";
    const bookExtraClass = "book-extra";
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    if (book.read) {
        bookCard.classList.add("read");
    }
    bookCard.dataset.index = myLibrary.length - 1;
    bookCard.addEventListener("dblclick", () => {
        removeBook(bookCard.dataset.index);
    });
    const list = document.createElement("ul");
    bookCard.appendChild(list);
    const liTitle = document.createElement("li");
    liTitle.classList.add(bookTitleClass);
    liTitle.textContent = book.title;
    const liAuthor = document.createElement("li");
    liAuthor.classList.add(bookExtraClass);
    liAuthor.textContent = book.author;
    const liPages = document.createElement("li");
    liPages.classList.add(bookExtraClass);
    liPages.textContent = book.pages;
    const liRead = document.createElement("li");
    const readLabel = document.createElement("span");
    readLabel.classList.add(bookExtraClass);
    readLabel.textContent = "Read:";
    const readCheckbox = document.createElement("input");
    readCheckbox.addEventListener("change", () => {
        bookCard.classList.toggle("read");
    });
    readCheckbox.type = "checkbox";
    readCheckbox.checked = book.read;
    appendChildren(liRead, readLabel, readCheckbox);
    appendChildren(list, liTitle, liAuthor, liPages, liRead);
    bookCardContainer.appendChild(bookCard);
}

/** @param {Node} parentNode  */
function appendChildren(parentNode, ...children) {
    children.forEach((child) => parentNode.appendChild(child));
}

function removeBook(index) {
    // Remove the book from the myLibrar array.
    myLibrary.splice(index, 1);
    // Remove the book card
    bookCardContainer.querySelector(`div[data-index="${index}"]`).remove();
    // Update data-index attribute of book cards
    const bookCards = bookCardContainer.querySelectorAll("div.book-card");
    bookCards.forEach((bookCard) => {
        if (bookCard.dataset.index > index) {
            bookCard.dataset.index -= 1;
        }
    });
}

function addBook() {
    if (!inputTitle.value || !inputAuthor.value || !inputPageNumber.value) {
        return;
    }

    const book = Object.create(Book, {
        "title": {
            value: inputTitle.value,
        },
        "author": {
            value: inputAuthor.value,
        },
        "pages": {
            value: inputPageNumber.value,
        },
        "read": {
            value: inputHasRead.checked,
        },
    });

    addBookToLibrary(book);
    addBookCard(book);
}

function addAllBooksFromLibrary() {
    myLibrary.forEach((book) => {
        addBook(book);
    })
}