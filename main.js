const booksShelf = document.getElementsByClassName("shelves");
const addBookButton = document.getElementById("addBook");

class Book {
  constructor(author, title, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
      return `${title} by ${author}, ${pages} pages, ${read}`;
    };
  }
}

let myLibrary = [];
let libraryIndex = 0;

function addBookToLibrary(e) {
  const author = document.getElementById("author");
  const title = document.getElementById("title");
  const pages = document.getElementById("pageNo");
  const read = document.getElementById("read");

  if (e.target.id == "submit") {
    const book = new Book(
      author.value,
      title.value,
      pages.value,
      read.checked === true ? "Yes" : "No"
    );
    myLibrary.push(book);
    displayBook();
  }
  return;
}

function displayBook() {
  for (let i = libraryIndex; i < myLibrary.length; i++) {
    const book = document.createElement("li");
    book.classList.add("shelf");
    book.innerHTML = `
    <button class="fa fa-remove" id="remove"></button>
    <span class="author">Author: ${myLibrary[i].author} </span>
    <span class="title">Title: ${myLibrary[i].title}</span>
    <span class="pageNo">Number of pages: ${myLibrary[i].pages}</span>
    <span class="read"
      ><span>Read: ${myLibrary[i].read}</span>
      <label class="switch">
        <input type="checkbox" id="readStatus" ${
          myLibrary[i].read == "Yes" ? "checked" : false
        }/>
        <span class="slider"></span> </label
    ></span>`;
    booksShelf[0].appendChild(book);
    libraryIndex++;
  }
}

function showBookForm() {
  let popup = document.createElement("div");
  popup.classList.add("popup");
  popup.setAttribute("id", "popup");
  popup.innerHTML = `<form action="#">
  <button class="fa fa-remove" id="removeForm" name="formRemove"></button>
  <label for="author"
    >Author: <input type="text" name="author" id="author" required autocomplete="off"
  /></label>
  <label for="title"
    >Title: <input type="text" name="title" id="title" required autocomplete="off"
  /></label>
  <label for="pageNo"
    >Number of pages:
    <input type="text" name="pageNo" id="pageNo" required autocomplete="off"
  /></label>
  <label for="read">Read it? </label
  ><input type="checkbox" name="read" id="read" />
  <button type="button" id="submit">Add Book</button>
</form>`;

  document.body.prepend(popup);
}

function closeFrom(e, remove = false) {
  const popup = document.getElementById("popup");
  if (e.target.id == "removeForm" || e.target.id == "popup" || remove == true) {
    popup.remove();
  }
}

function removeBook(e) {
  if (e.target.id !== "remove") return;
  e.target.parentElement.remove();
}

function changeReadStatus(e) {
  if (e.target.id !== "readStatus") return;
  console.log(e.target.parentElement.parentElement.innerText);
  e.target.parentElement.parentElement.firstChild.innerText =
    e.target.parentElement.parentElement.firstChild.innerText == "Read: Yes"
      ? "Read: No"
      : "Read: Yes";
}

addBookButton.addEventListener("click", showBookForm);
window.addEventListener("click", closeFrom);
window.addEventListener("click", addBookToLibrary);
window.addEventListener("click", removeBook);
window.addEventListener("click", changeReadStatus);
