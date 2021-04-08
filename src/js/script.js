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
      bookClass: 'book__image',
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

    /* add eventListener for bookImage */
    booksList.addEventListener('dblclick', function(event){

      /* stop preventDefault */
      event.preventDefault();

      /* check if event.target has the class .book__image */
      if(event.target.offsetParent.classList.contains(classNames.bookCart.bookClass)){
        
        /* find 'data-id' of bookImage */
        let id = event.target.offsetParent.getAttribute('data-id');
        console.log(id);

        /* check the book if it is in your favorites */
        if(!favoriteBooks.includes(id) || event.target.offsetParent.classList.contains(!classNames.bookCart.imageFavorite)){

          /* if not add a favorite class */
          event.target.offsetParent.classList.add(classNames.bookCart.imageFavorite);

          /* save id */
          favoriteBooks.push(id);

          /* check the book if it is in your favorites */
        } else if(favoriteBooks.includes(id) || event.target.offsetParent.classList.contains(classNames.bookCart.imageFavorite)){

          /* check if the id is in the array */
          const indexOfId = favoriteBooks.indexOf(id);

          /* remove ID */
          favoriteBooks.splice(indexOfId, 1);

          /* remove class favorite */
          event.target.offsetParent.classList.remove(classNames.bookCart.imageFavorite);
        }
      }
    });
    console.log('favoriteBooks', favoriteBooks);
  }


  render();
  initAction();

}