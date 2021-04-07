/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';
  
  const select = {
    templateOf: {
      bookCart: '#template-book'
    },
    containerOf: {
      booksList: '.books-list'
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
  render();

}