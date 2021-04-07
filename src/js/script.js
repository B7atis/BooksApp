/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';
  
  const select = {
    templateOf: {
      bookCart: '#template-book'
    },
    containerOf: {
      booksList: '.books-list'
    },
    imageOf: {
      bookImage: '.book__image'
    }
  };

  const classNames = {
    bookCart: {
      imageFavorite: 'favorite',
    }
  };

  function render() {
    const thisBooksList = this;
    thisBooksList.data = dataSource.books;

    for(const book of thisBooksList.data) {
            
      /* make a template for a book */
      const bookTemplate = Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML);

      /* generate HTML from template */
      const generatedHTML = bookTemplate(book);
      console.log('generatedHTML', generatedHTML);
      
      /* create DOM element */
      thisBooksList.element = utils.createDOMFromHTML(generatedHTML);
      console.log('thisBooksList.element', thisBooksList.element);

      /* find container of books */
      const bookContainer = document.querySelector(select.containerOf.booksList);

      /* add element for list */
      bookContainer.appendChild(thisBooksList.element);
    }
  }

  function initAction() {
    /* create an empty array */
    const favoriteBooks = [];

    /* find the list of books */
    let booksList = document.querySelector(select.containerOf.booksList);
    console.log('booksList', booksList);

    /* find all images in this list */
    let booksImages = booksList.querySelectorAll(select.imageOf.bookImage);
    console.log('bookImages', booksImages);

    /* make a loop to get image of one book */
    for(let bookImage of booksImages) {
      console.log('bookImages', bookImage);

      /* add eventListener for bookImage */
      bookImage.addEventListener('dblclick', function(event){

        /* stop preventDefault */
        event.preventDefault();

        /* add class 'favorite' */
        bookImage.classList.add(classNames.bookCart.imageFavorite);

        /* find 'data-id' of bookImage */
        let id = bookImage.getAttribute('data-id');
        console.log(id);
      });
      console.log('favoriteBooks', favoriteBooks);
    }
  }


  render();
  initAction();

}