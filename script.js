//Tanggal Dikerjakan 20/06/2024
//Muhammad Akbar Permanaatmaja - DICODING SUBMISSION
const unfinishedBookshelf = document.getElementById('unfinished-list');
const finishedBookshelf = document.getElementById('finished-list');
const addBookForm = document.getElementById('add-book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const isCompleteCheckbox = document.getElementById('isComplete');

// ngambil data buku dari localStorage
function getBooks() {
  return JSON.parse(localStorage.getItem('books')) || [];
}

//nyimpan data buku ke localStorage
function saveBooks(books) {
  localStorage.setItem('books', JSON.stringify(books));
}

//nampilin buku pada rak yang sesuai
function renderBook(book) {
  const { id, title, author, year, isComplete } = book;
  const bookItem = document.createElement('li');
  bookItem.innerHTML = `
    <div>
      <strong>${title}</strong> oleh ${author} (${year})
      <button onclick="moveBook(${id})">Pindahkan</button>
      <button onclick="deleteBook(${id})">Hapus</button>
    </div>
  `;

  if (isComplete) {
    finishedBookshelf.appendChild(bookItem);
  } else {
    unfinishedBookshelf.appendChild(bookItem);
  }
}

//nampilin semua buku yang ada di localStorage
function renderBooks() {
  unfinishedBookshelf.innerHTML = '';
  finishedBookshelf.innerHTML = '';
  const books = getBooks();
  books.forEach(book => {
    renderBook(book);
  });
}

//menambahkan buku baru
function addBook(event) {
  event.preventDefault();
  
  const id = +new Date();
  const title = titleInput.value;
  const author = authorInput.value;
  const year = parseInt(yearInput.value);
  const isComplete = isCompleteCheckbox.checked;

  const newBook = {
    id,
    title,
    author,
    year,
    isComplete,
  };

  const books = getBooks();
  books.push(newBook);
  saveBooks(books);

  renderBooks();
  addBookForm.reset();
}


function moveBook(id) {
  let books = getBooks();
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books[index].isComplete = !books[index].isComplete;
    saveBooks(books);
    renderBooks();
  }
}


function deleteBook(id) {
  let books = getBooks();
  books = books.filter(book => book.id !== id);
  saveBooks(books);
  renderBooks();
}

//form penambahan buku
addBookForm.addEventListener('submit', addBook);

//panggil fungsi renderBooks() agar buku-buku dari localStorage ditampilkan saat halaman dimuat
renderBooks();
