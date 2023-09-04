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
  const addBookForm = document.getElementById('add-book-form');
  addBookForm.style.display = 'block';

  const bookForm = document.getElementById('book-form');
  bookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    render();

    bookForm.reset();
    addBookForm.style.display = 'none';
  });
});
