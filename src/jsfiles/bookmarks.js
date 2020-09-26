import $ from 'jquery';
import store from './store';
import api from './api';

const intialHtml = function (bookmarks, selectedRating){
    let intialLoad = `
    <section class="filter-new-btns">
        <div class="buttons">
            <form id="add-new" class="heading">
                <p><button id="js-add-new" class="button">Add new Bookmark!</button><p>

                <p><label id="js-ratings">Filter</label>
                    <select class="ratings" name="ratings" id="rate">
                    ${filterHtmlDropdownList(selectedRating)}
                    </select><p>
            </form>
        </div>
    </section>`
    return intialLoad + bookmarksList(bookmarks, selectedRating);
};


const generateError = function (message) {
    return `
        <section class="error-content">
            <div>
                <button class="cancel-error" id="cancel-error">X</button>
                <p>All entries are required! Don't forget to make sure your URL has https:// in front!</p>
            </div>
        </section>`
  };
  



const filterHtmlDropdownList = function (selectedRating){
    let options = ''
    for(let i = 1; i <= 5; i++){
        if(selectedRating === i){
            options += `<option class="star-drop-down" selected="selected" value="${i}">${i}+ stars</option>`
        }else{
            options += `<option class="star-drop-down" value="${i}">${i}+ stars</option>`
        }
    };
    return options;
};





//create a function that shows collapsed  view of list
const collapsedHtml = function (bookmark) {
    if (!bookmark.expand) 
    {return `<div class="group-two js-bkm-element" data-item-id="${bookmark.id}">
                   <div class ="bkm-expanded">
                        <h3 class=" item item-double"> ${bookmark.title} ${bookmark.rating} </h3>
                        <button class="item expand-btn" id="expand">expand</button></a>
                    </div>
              </div>`
} else {
    return `<div class="group-two js-bkm-element" data-item-id="${bookmark.id}">
                <div class="bkm-expanded">
                    <h3 class=" item item-double">${bookmark.title} ${bookmark.rating}</h3>
                     <button class="item collapse-btn" id="collapse">collapse</button></a>
                </div>                  
                <div class="desc-expanded">
                    <p><a href="${bookmark.url}">Visit Site!</a></p>
                    <p>${bookmark.desc}</p>  
                    <button class="delete" id="js-delete">Delete</button>
                </div>
            </div>`
    };
};                          


//create a function that will generate html for adding bookmark page
const addingBookmarkHtml = function () {
    let addingBookmark = `
    <div class="error-container">
    </div>
    <form id='js-new-bkm'>
        <div class="new-bkm group">
            <div class="bkm-input item">
                <label aria-label="new-bkm-rating" for="new-bkm-rating">A Rating Between 1-5: </label>
                <input type="number" class="rating" size="3" min="1" max="5" name="url" placeholder="3" id="new-bkm-rating" required>
            </div>

            <div class="bkm-input item"> 
                <label id="new-bookmark-title">Name:</label>
                <input type="text" name="title" placeholder="Amazon" id="new-bkm-title">
            </div>

            <div class="bkm-input item">
                <label id="new-url">Add URL:</label>
                <input type="text" name="url" placeholder="https://www.amazon.com/" id="new-bkm-url" required>
          </div>

            <div class="bkm-input item">
                <label id="descripton">Description:</label>
                <input  type="text" name="desc" placeholder="I shop here all the time!" id="new-bkm-desc" required>
            </div>

            <div>    
                <div class="save">
                    <button class="save-btn" type="submit" id="bkm-save">Save</button>
             </div>
        </div>     
    </form>

    <form>
        <div class="cancel">    
            <button class="cancel-btn" id="js-cancel'">Cancel</button>
        </div>
    </form>`
        return addingBookmark;
};

const getBookmarkId = function (bookmark){
    return $(bookmark).closest('.js-bkm-element').data('item-id');
}

const bookmarksList = function (bookmarks, selectedRating){
    let allBookmarks = ``;
    for( let i = 0; i < bookmarks.length; i++ ){
        if (bookmarks[i].rating >= selectedRating) {
            allBookmarks += collapsedHtml(bookmarks[i]);
        }
    }
    return allBookmarks;
}
//RENDER FUNCTIONS!!
const renderError = function () {
    if (store.error) {
      const el = generateError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }
  };

//create render function that renders each page
const render = function (){
    renderError();

    console.log(store.bookmarkList);
    $('main').html(intialHtml(store.bookmarkList, 1));

     if (store.adding){

         $('main').html(addingBookmarkHtml());

     }  else if (store.filter) {
         $('main').html(intialHtml(store.bookmarkList, store.selectedRating));
        }
         //let filteredBookmarks = [...store.filteredBookmarksArray];
         //console.log(filteredBookmarks);
         
}




//EVENT HANDLERS!!!


//create function that listens to add new bookmark click
//adds addingBookmark html to page
//make store.adding = true
//calls render function
const handleAddNewButton = function (){
    $('main').on('click', '#js-add-new', event => {
        event.preventDefault();
        console.log('handleAddNewSubmit ran');
        store.filter = false;
        store.adding = true;
        render();
    })
};


//create function that listens to the submit button on the addingBookmark page
//adds new bookmark to the dom
//calls render function to go to bookmark list page
const handleNewBookSubmit = function (bookmark){
    $('main').on('submit', event => {
        event.preventDefault();
        console.log('handleNewBookSubmit ran');
        let newBookmarkTitle = $('#new-bkm-title').val();
        let newBookmarkUrl = $('#new-bkm-url').val();
        let newBookmarkDesc = $('#new-bkm-desc').val();
        let newBookmarkRating = $('#new-bkm-rating').val();
    
        
        let newBookmark = {
            title: newBookmarkTitle,
            url: newBookmarkUrl,
            desc: newBookmarkDesc,
            rating: newBookmarkRating
        };

        api.createBookmark(newBookmark)
        .then((newBookmark) =>{
            store.addNewBookmark(newBookmark);
            store.adding = false;
            render(); 
        })
        .catch((error) => {
            store.setError(error.message);
            renderError();
        })
    });
};

//create function for cancel button
const cancelButtonClick = function (){
    $('main').on('click','#js-cancel' , event =>{
        event.preventDefault();
        console.log('cancel click ran');
        store.adding = false;
        render();
    })
}


//create function for the delete button
const deleteButtonClick = function (){
    $('main').on('click', '#js-delete', event =>{
        event.preventDefault();
        console.log('delete button ran');
        const id = getBookmarkId(event.currentTarget);
        console.log(id);

        api.deleteBookmark(id)
         .then(()=> {
             store.deleteBookmark(id);
             console.log(id);
             render();
         })
         .catch((error) => {
             console.log(error);
             store.setError(error.message);
             renderError();
         });
    });
};


//function to handle when expand is clicked
//use getBookmarkId function to get id of item
//expanded = true
//render()
const handleExpandClick = function (){
    $('main').on('click','#expand', event => {
        event.preventDefault();
        const id = getBookmarkId(event.currentTarget);
        console.log('expand click ran');
        store.expandedBookmarkToggle(id);
        render();
    });
};

//create function that handles collapse click
const handleCollapseClick = function (){
    $('main').on('click','#collapse', event => {
        event.preventDefault();
        const id = getBookmarkId(event.currentTarget);
        //const bookmark = store.findById(id)
        console.log('collapse click ran');
        store.expandedBookmarkToggle(id);
        //bookmark.expand = false;
        render();
    });
};

//create function to handle filtering bookmarks on change?
const handleFilterChange = function (){
    $('main').on('change','#rate', event => {
        event.preventDefault(); 
        const selectedRating = parseInt($('#rate').val());
        console.log('rating', selectedRating);
        store.filteredBookmarksArray(selectedRating)
        store.filter = true;
        render();
    });
};

const handleCloseError = function () {
    $('main').on('click', '#cancel-error', () => {
      store.setError(null);
      renderError(); 
    });
  };


const bindEventListeners = function (){
    handleAddNewButton();
    handleNewBookSubmit();
    cancelButtonClick();
    deleteButtonClick();
    handleExpandClick();
    handleCollapseClick();
    handleFilterChange();
    handleCloseError();
}


//exports below
export default{
    bindEventListeners,
    render,
}
