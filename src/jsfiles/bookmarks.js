import $ from 'jquery';
import store from './store';
import api from './api';
import { bind } from 'file-loader';

const intialHtml = function (bookmarks, filterValue){
    let intialLoad = `
    <section class='filter-new-btns'>
    <div class='buttons'>
        <form id='add-new'>
            <button id='js-add-new' class="button">Add new Bookmark!</button>

            <label id="js-ratings">Filter</label>
                <select class ='ratings' name="ratings" id="rate">
                    <option value="all">All</option>
                    <option value="1">1 star</option>
                    <option value="2">2 stars</option>
                    <option value="3">3 stars</option>
                    <option value="4">4 stars</option>
                    <option value="5">5 stars</option>
                </select>
        </form>
    </div>
</section>
`
    return intialLoad + bookmarksList(bookmarks);
};


//create a function that shows collapsed  view of list
const collapsedHtml = function (bookmark) {
    if (!bookmark.expand) 
    {return `<div class="js-bkm-element" data-item-id="${bookmark.id}">
                      <div>
                          <h3><a href=''>${bookmark.title} ${bookmark.rating} <button id='expand'>expand</button></a></h3>
                      </div>
              </div>`
} else {
    return `<div class="js-bkm-element" data-item-id="${bookmark.id}">
                      <div>
                          <h3><a href=''>${bookmark.title} ${bookmark.rating} <button id='collapse'>collapse</button></a></h3>
                                          
                          <div>
                          <p>${bookmark.url}</p>  
                          <p<${bookmark.desc}</p>
                          <button id='js-delete'>Delete</button>
                          </div>
                          
                      </div>
              </div>`
    };
};                          


//create a function that will generate html for adding bookmark page
const addingBookmarkHtml = function () {
    let addingBookmark = `
    <form id='js-new-bkm'>
            <div class=''>
                <label aria-label='new-bkm-rating' for='new-bkm-rating'>Add a Rating Between 1-5</label>
                <input type="number" class="rating" size="3" min="1" max="5" name="url" placeholder="3" id="new-bkm-rating" required>

            </div>

            <div class='new-bkm'> 
                <label id="new-bookmark-title">Bookmark Name:</label>
                <input type="text" name="title" placeholder="New bookmark" id="new-bkm-title">
            </div> 

            <div class='new-bkm'>
                <label id="new-url">Add URL:</label>
                <input type="text" name="url" placeholder="url" id="new-bkm-url" required>
            </div>

            <div class='new-bkm'>
                <label id="descripton">Description:</label>
                <input type="text" name="Description" placeholder="Description" id="new-bkm-desc" required>
            </div>
            <div class='save-delete'>
                <button type='submit' id='bkm-save'>Save</button>
            </div>
            </form>
    <form>
            <div>    
                <button id='js-cancel'>Cancel</button>
            </div>
        </form>`
        return addingBookmark;
};

//create a function that will generate html for editing bookmark page
/*
const editingBookmarkHtml = function (bookmark, rating) {
    let editingBookmark = `
    <div class="expanded-bkm" data-item-id="${bookmark.id}">
     <section class="bookmark-top-row">
     <a class="expanded-title" href="${bookmark.url}" target="_blank"> <strong> ${bookmark.title} </strong> </a> 
     <a class="expanded-rating" href="${bookmark.url}" target="_blank"> ${rating} </a> 
     <button class="collapse-btn"></i> Collapse </button>
   </section>
     <section class="bookmark-bottom-row"> 
       <p id="description">Notes: ${bookmark.desc} </p>
       <button class="delete-btn"> Delete </button>
     </section>
   </div>`
   return editingBookmark;
};
*/


const bookmarksList = function (bookmarks){
    let allBookmarks = ``;
    for( let i = 0; i < bookmarks.length; i++ ){
        allBookmarks += collapsedHtml(bookmarks[i]);
    }
    return allBookmarks;
}


//create render function that renders each page
const render = function (){
    $('main').html(intialHtml(store.bookmarkList));

     if (store.adding){
         $('main').html(addingBookmarkHtml());

         
     } else if (store.filter){
         let filteredBookmarks = [...store.filteredBookmarks];
         console.log(filteredBookmarks);
         $('main').html(intialHtml(filteredBookmarks));
         store.filteredBookmarks= [];
     }
}


//create function that listens to add new bookmark click
//adds addingBookmark html to page
//make store.adding = true
//calls render function
const handleAddNewButton = function (){
    $('main').on('click', '#js-add-new', event => {
        event.preventDefault();
        console.log('handleAddNewSubmit ran');
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
        });
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

const getBookmarkId = function (bookmark){
    return $(bookmark).closest('.js-bkm-element').data('item-id');
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
        console.log(id);
        store.expandedBookmarkToggle(id);
        render();
    })
}

//create function that handles collapse click
const handleCollapseClick = function (){
    $('main').on('click','#collapse', event => {
        event.preventDefault();
        const id = getBookmarkId(event.currentTarget);
        //const bookmark = store.findById(id)
        console.log(id);
        store.expandedBookmarkToggle(id);
        //bookmark.expand = false;
        render();
    })
}

//create function to handle filtering bookmarks on change?
const handleFilterChange = function (){
    $('main').on('change','#rate', event => {
        const selectedRating = parseInt($('#rate').val());
        console.log('rating', selectedRating);
        store.filterBookmarks(selectedRating);
        render();
    })
}


const bindEventListeners = function (){
    handleAddNewButton();
    handleNewBookSubmit();
    cancelButtonClick();
    deleteButtonClick();
    handleExpandClick();
    handleCollapseClick();
    handleFilterChange();
}


//exports below
export default{
    bindEventListeners,
    render,
}
