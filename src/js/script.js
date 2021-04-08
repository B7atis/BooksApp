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
    },
    filtersOf: {
      form: '.filters'
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

    /* find filters of form */
    const form = document.querySelector(select.filtersOf.form);
    console.log('form', form);

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
    
    /* add eventListener for form */
    form.addEventListener('click', function(event){

      /* check if an element has been clicked */
      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){

        /* if so, show its value in console */
        console.log(event.target.value);

        /* check if input is selected, if so true */
        if(event.target.checked == true){

          /* if so, add a value to the filters array */
          filters.push(event.target.value);

          /* check if input is selected, if so false */
        } else if(event.target.checked == false){

          /* if not, remove the filters from the array */
          const indexOfFilters = filters.indexOf(event.target.value);
          filters.splice(indexOfFilters, 1);
        }
        console.log('filters', filters);
        filterBooks();
      }
    });
  }

  /* create an empty array */
  const filters = [];

  function filterBooks(){
    /* create loops for all dataSource.books items */
    for(let book of dataSource.books){

      /* add the variable false */
      let shouldBeHidden = false;

      /* create loops for array filteres */
      for(const filter of filters) {

        /* check if the filter fits the book */
        if(!book.details[filter]){

          /* change a property and break the loop */
          shouldBeHidden = true;
          break;
        }
      }

      /* find the book__image element */
      const id = book.id;
      console.log(id);
      const item = document.querySelector('.book__image[data-id="' + id + '"]'); 

      /* check the value of shouldBeHidden if so "true" */
      if(shouldBeHidden == true){

        /* add the hidden class */
        item.classList.add('hidden');

      /* check the value of shouldBeHidden if so "false" */
      } else if(shouldBeHidden == false){

        /* remove the hidden class */
        item.classList.remove('hidden');
      }
    }
  }


  render();
  initAction();

}