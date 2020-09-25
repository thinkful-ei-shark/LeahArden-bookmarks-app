//imports up top
import $ from 'jquery';
import store from './store';
import api from './api';

const intialHtml = function (bookmarks){
    let intialLoad = `
    <section class='filter-new-btns'>
    <div class='buttons'>
        <form id='add-new'>
            <button id='js-add-new' class="button">Add new Bookmark!</button>

            <label id="js-ratings">Filter</label>
                <select name="ratings" id="rate">
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
    let collapsedView = /*`       
    <div id='accordion' class="collapsed-bkm" data-item-id="${bookmark.id}">
        <section class="">
            <a class="collapsed-title" >${bookmark.title}</a> 
            <a class="collapsed-rating"> ${bookmark.rating} </a> 
            <button  type='button' class="expand-btn">Expand</button>
        </section>
  </div>`*/
  `     <div id="accordion" data-item-id="${bookmark.id}">
                <div id='accordion'>
                    <h3><a href=''>${bookmark.title} ${bookmark.rating} <button id='expand-collapse'>...</button></a></h3>
                    
                    <div>
                    <p>${bookmark.url}</p>  
                    <p<${bookmark.desc}</p>
                    <button>Delete</button>
                    </div>
                    
                </div>
        </div>`
  return collapsedView;
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
                <button id='js-cancel'>Cancel</button>
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



const bookmarksList = function (bookmarks){
    let allBookmarks = ``;
    for( let i = 0; i < bookmarks.length; i++ ){
        allBookmarks += collapsedHtml(bookmarks[i]);
    }
    return allBookmarks;
}

//create render function that renders each page
const render = function () {
    console.log(store);
    //$('main').html(intialHtml(store.bookmarkList));
    if(!store.adding){
        $('main').html(intialHtml(store.bookmarkList));
    } else {
        $('main').html(addingBookmarkHtml());
    }

};


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
    $('main').on('submit', '#bkm-save', event => {
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
const handleCancelClick = function (){
    $('main').on('click', '#js-cancel', event => {
        console.log('cancel button ran');
        event.preventDefault;
        store.adding = false;
        render();
    })
}

//create function to toggle expand button
const handleExpand = function (){
    $('main').on('click', '#expand-collapse', event =>{
        console.log('expand ran');
        event.preventDefault;
    } )
}

//create function that listens to dropdown .onChange()?
//when specfic filter is clicked
//create new array of filtered bookmarks (call function filterBookmarks from store.js)
/*const handleFilterDropdown = function ()[
    $().on('change','' , event => {

    })
]
*/


   //create function that





//exports below
export default{
    handleAddNewButton,
    handleNewBookSubmit,
    handleCancelClick,
    render,
}
