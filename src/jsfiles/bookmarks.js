import $ from 'jquery';
import store from './store';
import api from './api';
import { bind } from 'file-loader';

const intialHtml = function (bookmarks, selectedRating){
    let intialLoad = `
    <section class='filter-new-btns'>
    <div class='buttons'>
        <form id='add-new'>
            <button id='js-add-new' class="button">Add new Bookmark!</button>

            <label id="js-ratings">Filter</label>
                <select class ='ratings' name="ratings" id="rate">
                ${filterHtmlDropdownList(selectedRating)}
                </select>
        </form>
    </div>
</section>
`
    return intialLoad + bookmarksList(bookmarks, selectedRating);
};



const filterHtmlDropdownList = function (selectedRating){
    let options = ''
    for(let i = 1; i <= 5; i++){
        if(selectedRating === i){
            options += `<option selected="selected" value="${i}">${i} star</option>`
        }else{
            options += `<option value="${i}">${i} star</option>`
        }
    };
    return options;
};





//create a function that shows collapsed  view of list
const collapsedHtml = function (bookmark) {
    if (!bookmark.expand) 
    {return `<div class="js-bkm-element" data-item-id="${bookmark.id}">
                      <div>
                          <h3> ${bookmark.title} ${bookmark.rating} <button id='expand'>expand</button></a></h3>
                      </div>
              </div>`
} else {
    return `<div class="js-bkm-element" data-item-id="${bookmark.id}">
                      <div>
                          <h3>${bookmark.title} ${bookmark.rating}<button id='collapse'>collapse</button></a></h3>
                                          
                          <div>
                          <p>${bookmark.url}</p>
                           <p>${bookmark.desc}</p>  
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
                <input type="text" name="desc" placeholder="Description" id="new-bkm-desc" required>
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


const bookmarksList = function (bookmarks, selectedRating){
    let allBookmarks = ``;
    for( let i = 0; i < bookmarks.length; i++ ){
        if (bookmarks[i].rating >= selectedRating) {
            allBookmarks += collapsedHtml(bookmarks[i]);
        }
    }
    return allBookmarks;
}


//create render function that renders each page
const render = function (){
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
        console.log('expand click ran');
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
        console.log('collapse click ran');
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
        store.filteredBookmarksArray(selectedRating)
        store.filter = true;
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
