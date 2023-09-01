const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function render() {
  const libraryContainer = document.querySelector('.library');
  libraryContainer.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
      <h2>${book.title}</h2>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
      <button class="toggle-read-btn" data-index="${index}">${book.read ? 'Mark Unread' : 'Mark Read'}</button>
      <button class="remove-book-btn" data-index="${index}">Remove</button>
    `;
    libraryContainer.appendChild(bookCard);
  });

  const toggleReadButtons = document.querySelectorAll('.toggle-read-btn');
  toggleReadButtons.forEach(button => {
    button.addEventListener('click', toggleReadStatus);
  });

  const removeButtons = document.querySelectorAll('.remove-book-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', removeBook);
  });
}

function toggleReadStatus(event) {
  const index = event.target.dataset.index;
  myLibrary[index].read = !myLibrary[index].read;
  render();
}

function removeBook(event) {
  const index = event.target.dataset.index;
  myLibrary.splice(index, 1);
  render();
}

document.getElementById('new-book-btn').addEventListener('click', () => {
  const title = prompt('Enter book title:');
  const author = prompt('Enter author:');
  const pages = prompt('Enter number of pages:');
  const read = confirm('Have you read this book?');

  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  render();
});

const book1 = new Book('Why Acts they you do', 'Tim Lahaye', 279, true);
const book2 = new Book('Five Love language', 'Gary Chapman', 271, true);
addBookToLibrary(book1);
addBookToLibrary(book2);
render();