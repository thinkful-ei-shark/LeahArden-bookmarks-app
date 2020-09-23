//imports up top
import $ from 'jquery';
import store from './store';

//create a function that will generate html for intial load page
const collapsedHtml = function (bookmark, rating) {
    let collapsedView = `       
    <div class="collapsed-bkm" data-item-id="${bookmark.id}">
        <section class="">
            <a class="collapsed-title" href="${bookmark.url}" target="_blank">${bookmark.title}</a> 
            <a class="collapsed-rating" href="${bookmark.url}" target="_blank"> ${rating} </a> 
            <button  type='button' class="expand-btn">Expand</button>
        </section>
  </div>`
  return collapsedView;
};

//create a function that will generate html for adding bookmark page
const addingBookmarkHtml = function () {
    let addingBookmark = `
    <form class='new-bkm'>
            <div class='new-bkm'> 
                <label id="new-bookmark-title">Bookmark Name:</label>
                <input type="text" name="title" placeholder="New bookmark" id="new-bookmark-title" required>
            </div> 

            <div class='new-bkm'>
                <label id="new-url">Add URL:</label>
                <input type="text" name="url" placeholder="url" id="new-url">
            </div>

            <div class='new-bkm'>
                <label id="descripton">Description:</label>
                <input type="text" name="Description" placeholder="Description" id="description">
            </div>
            <div>
                <button id="add-bookmark-save-button">Save </button>
            </div> 
        </form>`
        return addingBookmark;
};

//create a function that will generate html for editing bookmark page
const editingBookmarkHtml = function (bookmark, rating) {
    let editingBookmark = `
    <div class="expanded-bkm" data-item-id="${bookmark.id}">
     <section class="bookmark-top-row">
     <a class="expanded-title" href="${bookmark.url}" target="_blank"> <strong> ${bookmark.title} </strong> </a> 
     <a class="expanded-rating" href="${bookmark.url}" target="_blank"> ${rating} </a> 
     <button class="collapse-btn"></i> Collapse </button>
   </section>
     <section class="bookmark-bottom-row"> 
       <p id="description"> <strong>Notes:</strong> ${bookmark.desc} </p>
       <button class="delete-btn"></i> Delete </button>
     </section>
   </div>`
   return editingBookmark;
};

//create render function that renders each page
const render = function () {
    //store bookmarks as variable
    const bookmarks = Store.bookmarkList;
    //get the current rating/filter
    const filterValue = Store.ratingFilter
    //gen the html for the bookmarks list
};

   //create function that listens to add new bookmark click
   //adds addingBookmark html to page
const addNewButton = function (){
    $('#add-new').on('click', '#js-add-new', event => {
        event.preventDefault();
        console.log('addNewSubmit ran');
        addingBookmarkHtml();
    })
};

   //create function that listens to dropdown .onChange()?
   //when specfic filter is clicked
   //create new array of filtered bookmarks (call function filterBookmarks from store.js)

   //create function that





//exports below
export default{
    addNewButton,
}